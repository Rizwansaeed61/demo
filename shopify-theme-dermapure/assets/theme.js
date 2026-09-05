/**
 * DermaPure Clinical OS 2.0 Theme JS
 * Handles Shopify Ajax Cart, Cart Drawer, Shipping Bar, and Routine Bundler.
 */

(function () {
  'use strict';

  const ShopifyCart = {
    threshold: window.DermaPureConfig ? window.DermaPureConfig.freeShippingThreshold : 75,

    init() {
      this.bindEvents();
      this.refreshCart();
    },

    bindEvents() {
      // Open cart drawer
      document.querySelectorAll('[data-action="open-cart"]').forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      // Close cart drawer
      document.querySelectorAll('[data-action="close-cart"]').forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeDrawer();
        });
      });

      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeDrawer();
      });

      // Intercept form submissions for Add to Cart
      document.addEventListener('submit', (e) => {
        const form = e.target.closest('form[action*="/cart/add"]');
        if (form) {
          e.preventDefault();
          this.handleAddToCart(form);
        }
      });

      // Quick add buttons
      document.addEventListener('click', (e) => {
        const quickAddBtn = e.target.closest('[data-quick-add]');
        if (quickAddBtn) {
          e.preventDefault();
          const variantId = quickAddBtn.getAttribute('data-variant-id');
          const title = quickAddBtn.getAttribute('data-product-title') || 'Clinical Formula';
          const price = parseFloat(quickAddBtn.getAttribute('data-product-price') || 48);
          const image = quickAddBtn.getAttribute('data-product-image') || '';
          this.addItem(variantId, 1, { title, price, image });
        }
      });
    },

    openDrawer() {
      const drawer = document.getElementById('CartDrawer');
      if (drawer) {
        drawer.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeDrawer() {
      const drawer = document.getElementById('CartDrawer');
      if (drawer) {
        drawer.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    },

    async handleAddToCart(form) {
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Adding Formulation...';
      }

      const formData = new FormData(form);
      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          const item = await res.json();
          await this.refreshCart();
          this.openDrawer();
        } else {
          // Fallback if local preview without Shopify backend
          this.fallbackLocalAdd(formData);
        }
      } catch (err) {
        // Fallback for non-Shopify static preview environments
        this.fallbackLocalAdd(formData);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }
      }
    },

    async addItem(variantId, quantity = 1, metadata = {}) {
      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity
          })
        });

        if (res.ok) {
          await this.refreshCart();
          this.openDrawer();
        } else {
          this.fallbackAddDirect(variantId, quantity, metadata);
        }
      } catch (err) {
        this.fallbackAddDirect(variantId, quantity, metadata);
      }
    },

    async updateQuantity(key, quantity) {
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: key,
            quantity: parseInt(quantity, 10)
          })
        });

        if (res.ok) {
          await this.refreshCart();
        } else {
          this.fallbackUpdateQty(key, quantity);
        }
      } catch (err) {
        this.fallbackUpdateQty(key, quantity);
      }
    },

    async refreshCart() {
      try {
        const res = await fetch('/cart.js', {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const cart = await res.json();
          this.renderCart(cart);
        } else {
          this.renderLocalCart();
        }
      } catch (err) {
        this.renderLocalCart();
      }
    },

    renderCart(cart) {
      const countEls = document.querySelectorAll('[data-cart-count]');
      countEls.forEach((el) => {
        el.innerText = cart.item_count || 0;
      });

      const itemsList = document.getElementById('CartDrawerItems');
      const subtotalEl = document.getElementById('CartDrawerSubtotal');
      const shippingTrack = document.getElementById('ShippingBarFill');
      const shippingMsg = document.getElementById('ShippingBarMsg');

      const subtotal = (cart.total_price / 100);

      if (subtotalEl) {
        subtotalEl.innerText = '$' + subtotal.toFixed(2);
      }

      // Update Shipping Bar
      if (shippingTrack && shippingMsg) {
        const pct = Math.min(100, (subtotal / this.threshold) * 100);
        shippingTrack.style.width = pct + '%';
        if (subtotal >= this.threshold) {
          shippingMsg.innerHTML = '🎉 <span class="font-bold text-emerald-700">Congratulations! Free Clinical Express Shipping Unlocked!</span>';
        } else {
          const remaining = (this.threshold - subtotal).toFixed(2);
          shippingMsg.innerHTML = `Add <span class="font-bold text-primary">$${remaining}</span> more to unlock <strong>FREE Clinical Express Shipping</strong>`;
        }
      }

      if (!itemsList) return;

      if (!cart.items || cart.items.length === 0) {
        itemsList.innerHTML = `
          <div class="py-12 text-center text-slate-500">
            <span class="material-symbols-outlined text-5xl text-slate-300 mb-2">shopping_bag</span>
            <p class="font-semibold text-slate-700">Your clinical regimen is empty</p>
            <p class="text-xs text-slate-500 mt-1">Explore our dermatologist-backed active formulas to get started.</p>
          </div>
        `;
        return;
      }

      itemsList.innerHTML = cart.items.map((item) => `
        <div class="flex items-center gap-4 py-3 border-b border-slate-100">
          <img src="${item.featured_image ? item.featured_image.url : ''}" alt="${item.title}" class="w-16 h-16 rounded-xl object-cover bg-slate-100 flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-slate-900 truncate">${item.product_title}</h4>
            <p class="text-xs text-slate-500">${item.variant_title || 'Full Size'}</p>
            <div class="flex items-center justify-between mt-2">
              <div class="qty-stepper scale-90 -ml-1">
                <button type="button" class="qty-btn" onclick="ShopifyCart.updateQuantity('${item.key}', ${item.quantity - 1})">-</button>
                <input type="text" class="qty-input" value="${item.quantity}" readonly>
                <button type="button" class="qty-btn" onclick="ShopifyCart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
              </div>
              <span class="text-sm font-bold text-slate-900">$${(item.final_line_price / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `).join('');
    },

    // Local state fallback for non-Shopify offline inspection
    _localCart: JSON.parse(localStorage.getItem('dermapure_cart') || '[]'),

    saveLocalCart() {
      localStorage.setItem('dermapure_cart', JSON.stringify(this._localCart));
      this.renderLocalCart();
    },

    fallbackAddDirect(id, qty, metadata) {
      const existing = this._localCart.find(i => i.id == id);
      if (existing) {
        existing.quantity += qty;
      } else {
        this._localCart.push({
          id: id || 'item_' + Date.now(),
          key: 'key_' + (id || Date.now()),
          title: metadata.title || 'Clinical Active Formula',
          product_title: metadata.title || 'Clinical Active Formula',
          variant_title: 'Full Size Formulation',
          price: (metadata.price || 48) * 100,
          final_line_price: (metadata.price || 48) * 100 * qty,
          quantity: qty,
          featured_image: { url: metadata.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80' }
        });
      }
      this.saveLocalCart();
      this.openDrawer();
    },

    fallbackLocalAdd(formData) {
      const id = formData.get('id') || 'prod_' + Date.now();
      const qty = parseInt(formData.get('quantity') || 1, 10);
      this.fallbackAddDirect(id, qty, {});
    },

    fallbackUpdateQty(key, qty) {
      qty = parseInt(qty, 10);
      if (qty <= 0) {
        this._localCart = this._localCart.filter(i => i.key !== key && i.id !== key);
      } else {
        const item = this._localCart.find(i => i.key === key || i.id === key);
        if (item) {
          item.quantity = qty;
          item.final_line_price = item.price * qty;
        }
      }
      this.saveLocalCart();
    },

    renderLocalCart() {
      const cartObj = {
        item_count: this._localCart.reduce((sum, i) => sum + i.quantity, 0),
        total_price: this._localCart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        items: this._localCart
      };
      this.renderCart(cartObj);
    }
  };

  window.ShopifyCart = ShopifyCart;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ShopifyCart.init());
  } else {
    ShopifyCart.init();
  }
})();
