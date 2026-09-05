/**
 * DermaPure Clinical Skincare Store Engine
 * Global State, Cart Drawer, Toast Notifications, and Regimen Manager
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'dermapure_cart_v1';
  const DISCOUNT_KEY = 'dermapure_discount_v1';
  const FREE_SHIPPING_THRESHOLD = 999;

  class DermaStoreEngine {
    constructor() {
      this.cart = [];
      this.discountCode = null;
      this.discountPercent = 0;
      this.isDrawerOpen = false;
      this.init();
    }

    init() {
      this.loadStorage();
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.mount());
      } else {
        this.mount();
      }
    }

    loadStorage() {
      try {
        const savedCart = localStorage.getItem(STORAGE_KEY);
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        }
        const savedDiscount = localStorage.getItem(DISCOUNT_KEY);
        if (savedDiscount) {
          const disc = JSON.parse(savedDiscount);
          this.discountCode = disc.code;
          this.discountPercent = disc.percent;
        }
      } catch (e) {
        console.warn('Failed to load storage:', e);
        this.cart = [];
      }
    }

    saveStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart));
        if (this.discountCode) {
          localStorage.setItem(DISCOUNT_KEY, JSON.stringify({
            code: this.discountCode,
            percent: this.discountPercent
          }));
        } else {
          localStorage.removeItem(DISCOUNT_KEY);
        }
      } catch (e) {
        console.warn('Failed to save storage:', e);
      }
    }

    mount() {
      this.injectCartDrawer();
      this.injectToastContainer();
      this.bindGlobalTriggers();
      this.updateBadges();
      this.renderDrawer();
    }

    bindGlobalTriggers() {
      // Find all cart trigger buttons in header or on page
      document.querySelectorAll('[data-path="cart"], .cart-trigger, a[aria-label="Shopping Cart"]').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCart();
        });
      });
    }

    injectCartDrawer() {
      if (document.getElementById('dermapure-cart-drawer')) return;

      const drawerHtml = `
        <div id="dermapure-cart-drawer" class="fixed inset-0 z-[100] pointer-events-none transition-all duration-300">
          <!-- Backdrop -->
          <div id="cart-drawer-backdrop" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none"></div>
          
          <!-- Slide-out Drawer Panel -->
          <div id="cart-drawer-panel" class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300 ease-out pointer-events-auto border-l border-slate-100">
            <!-- Header -->
            <div class="px-6 py-4 bg-[#002d59] text-white flex items-center justify-between shadow-sm">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[#aaf779] text-[22px]">medical_services</span>
                <h3 class="font-bold text-lg tracking-tight">Prescription Bag</h3>
                <span id="drawer-item-count" class="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">0</span>
              </div>
              <button id="close-cart-btn" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Free Shipping Progress Tracker -->
            <div id="shipping-tracker-bar" class="px-6 py-3 bg-[#e7eeff] border-b border-[#cfdaf2] transition-colors">
              <div class="flex items-center justify-between text-xs font-semibold text-[#002d59] mb-1.5">
                <span id="shipping-tracker-label">Add ₹999 for FREE delivery</span>
                <span class="material-symbols-outlined text-[16px] text-[#2f6c00]" id="shipping-tracker-icon">local_shipping</span>
              </div>
              <div class="w-full bg-white/70 h-2 rounded-full overflow-hidden">
                <div id="shipping-progress-fill" class="h-full bg-gradient-to-r from-[#004380] to-[#2f6c00] rounded-full transition-all duration-500" style="width: 0%"></div>
              </div>
            </div>

            <!-- Items Scrollable Container -->
            <div id="drawer-items-list" class="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
              <!-- Dynamically populated -->
            </div>

            <!-- Drawer Footer / Summary -->
            <div class="p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
              <!-- Promo Code Input -->
              <div id="drawer-promo-box" class="flex items-center gap-2">
                <div class="relative flex-1">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">sell</span>
                  <input id="drawer-coupon-input" type="text" placeholder="Promo code (DERMA10)" class="w-full pl-9 pr-3 py-2 text-xs uppercase font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002d59]" />
                </div>
                <button id="drawer-apply-coupon" class="bg-[#002d59] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#004380] transition-colors">
                  Apply
                </button>
              </div>

              <div id="active-coupon-badge" class="hidden flex items-center justify-between bg-[#aaf779]/30 text-[#092100] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#aaf779]">
                <span id="active-coupon-text">Code DERMA10 applied (10% OFF)</span>
                <button id="remove-coupon-btn" class="text-slate-600 hover:text-red-600 text-xs underline">Remove</button>
              </div>

              <!-- Price Breakdown -->
              <div class="space-y-1.5 text-xs text-slate-600">
                <div class="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span id="drawer-subtotal" class="font-bold text-slate-800">₹0</span>
                </div>
                <div id="drawer-discount-row" class="hidden flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Prescription Discount</span>
                  <span id="drawer-discount-amt">-₹0</span>
                </div>
                <div class="flex items-center justify-between">
                  <span>Sterile Clinical Shipping</span>
                  <span id="drawer-shipping-amt" class="font-semibold text-slate-800">₹0</span>
                </div>
                <div class="flex items-center justify-between text-sm font-extrabold text-[#002d59] pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span id="drawer-total">₹0</span>
                </div>
                <p class="text-[10px] text-slate-400 text-right">Includes all applicable GST & clinical handling</p>
              </div>

              <!-- Checkout CTA -->
              <div class="space-y-2">
                <a id="drawer-checkout-btn" href="checkout.html" class="w-full h-12 bg-gradient-to-r from-[#004380] via-[#002d59] to-[#2f6c00] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center justify-center gap-2 transition-all">
                  <span class="material-symbols-outlined text-[18px]">lock</span>
                  <span id="drawer-checkout-text">PROCEED TO CHECKOUT • ₹0</span>
                </a>
                <div class="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <span class="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
                  <span>Authentic Doctor-Prescribed Stock • 100% Tamper Proof</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', drawerHtml);

      // Event Listeners for Drawer
      document.getElementById('close-cart-btn').addEventListener('click', () => this.closeCart());
      document.getElementById('cart-drawer-backdrop').addEventListener('click', () => this.closeCart());

      document.getElementById('drawer-apply-coupon').addEventListener('click', () => {
        const input = document.getElementById('drawer-coupon-input');
        if (input && input.value.trim()) {
          this.applyDiscount(input.value.trim());
          input.value = '';
        }
      });

      document.getElementById('remove-coupon-btn').addEventListener('click', () => {
        this.removeDiscount();
      });
    }

    injectToastContainer() {
      if (document.getElementById('dermapure-toast-container')) return;

      const containerHtml = `
        <div id="dermapure-toast-container" class="fixed bottom-6 right-6 z-[120] flex flex-col gap-2 pointer-events-none"></div>
      `;
      document.body.insertAdjacentHTML('beforeend', containerHtml);
    }

    showToast(title, subtitle = '', type = 'success') {
      const container = document.getElementById('dermapure-toast-container');
      if (!container) return;

      const toastId = 'toast-' + Date.now();
      const icon = type === 'success' ? 'check_circle' : 'info';
      const bgColor = type === 'success' ? 'bg-[#002d59] border-[#aaf779]' : 'bg-slate-900 border-slate-700';

      const toastHtml = `
        <div id="${toastId}" class="${bgColor} border text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-8 opacity-0 transition-all duration-300 pointer-events-auto max-w-sm">
          <span class="material-symbols-outlined text-[#aaf779] text-[22px] shrink-0">${icon}</span>
          <div class="flex flex-col">
            <span class="font-bold text-xs">${title}</span>
            ${subtitle ? `<span class="text-[11px] text-slate-300">${subtitle}</span>` : ''}
          </div>
          <button onclick="document.getElementById('${toastId}').remove()" class="ml-auto text-slate-400 hover:text-white text-sm">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', toastHtml);

      requestAnimationFrame(() => {
        const el = document.getElementById(toastId);
        if (el) {
          el.classList.remove('translate-y-8', 'opacity-0');
          el.classList.add('translate-y-0', 'opacity-100');
        }
      });

      setTimeout(() => {
        const el = document.getElementById(toastId);
        if (el) {
          el.classList.remove('translate-y-0', 'opacity-100');
          el.classList.add('translate-y-4', 'opacity-0');
          setTimeout(() => el.remove(), 300);
        }
      }, 3500);
    }

    openCart() {
      const drawer = document.getElementById('dermapure-cart-drawer');
      const backdrop = document.getElementById('cart-drawer-backdrop');
      const panel = document.getElementById('cart-drawer-panel');

      if (!drawer || !panel) return;

      drawer.classList.remove('pointer-events-none');
      backdrop.classList.remove('pointer-events-none', 'opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');

      this.isDrawerOpen = true;
      this.renderDrawer();
    }

    closeCart() {
      const drawer = document.getElementById('dermapure-cart-drawer');
      const backdrop = document.getElementById('cart-drawer-backdrop');
      const panel = document.getElementById('cart-drawer-panel');

      if (!drawer || !panel) return;

      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');

      setTimeout(() => {
        drawer.classList.add('pointer-events-none');
        this.isDrawerOpen = false;
      }, 300);
    }

    addItem({ id, title, price, originalPrice = null, size = 'Standard', image = '', quantity = 1, category = 'Skincare' }) {
      const existing = this.cart.find(item => item.id === id && item.size === size);

      if (existing) {
        existing.quantity += quantity;
      } else {
        this.cart.push({
          id,
          title,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : null,
          size,
          image,
          quantity: Number(quantity),
          category
        });
      }

      this.saveStorage();
      this.updateBadges();
      this.renderDrawer();
      this.showToast(`Added ${title} (${size})`, `Prescription Bag updated with ${quantity} unit(s)`);
      this.openCart();
    }

    addBundle(items, bundleName = '3-Step Clinical Regimen') {
      let count = 0;
      items.forEach(item => {
        this.addItem({ ...item, quantity: 1 });
        count++;
      });
      this.showToast(`Added ${bundleName}`, `${count} clinical formulas bundled into your bag`);
    }

    removeItem(id, size) {
      this.cart = this.cart.filter(item => !(item.id === id && item.size === size));
      this.saveStorage();
      this.updateBadges();
      this.renderDrawer();
      this.showToast('Item removed', '', 'info');
    }

    updateQuantity(id, size, delta) {
      const item = this.cart.find(i => i.id === id && i.size === size);
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(id, size);
      } else {
        this.saveStorage();
        this.updateBadges();
        this.renderDrawer();
      }
    }

    applyDiscount(code) {
      const cleanCode = code.toUpperCase().trim();
      if (cleanCode === 'DERMA10') {
        this.discountCode = cleanCode;
        this.discountPercent = 10;
        this.saveStorage();
        this.renderDrawer();
        this.showToast('Coupon Applied! (10% OFF)', 'Clinical discount calculated on all eligible products');
      } else if (cleanCode === 'DERMA15' || cleanCode === 'WELCOME15') {
        this.discountCode = cleanCode;
        this.discountPercent = 15;
        this.saveStorage();
        this.renderDrawer();
        this.showToast('VIP Coupon Applied! (15% OFF)', 'DermaClub exclusive benefit applied');
      } else {
        this.showToast('Invalid Coupon Code', 'Please enter a valid promotion code like DERMA10', 'info');
      }
    }

    removeDiscount() {
      this.discountCode = null;
      this.discountPercent = 0;
      this.saveStorage();
      this.renderDrawer();
      this.showToast('Coupon Removed', '', 'info');
    }

    getSubtotal() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getDiscountAmount() {
      if (!this.discountPercent || this.discountPercent <= 0) return 0;
      const subtotal = this.getSubtotal();
      return Math.round((subtotal * this.discountPercent) / 100);
    }

    getShippingCost() {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 80;
    }

    getTotal() {
      const subtotal = this.getSubtotal();
      if (subtotal === 0) return 0;
      const discount = this.getDiscountAmount();
      const shipping = this.getShippingCost();
      return Math.max(0, subtotal - discount + shipping);
    }

    getItemCount() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateBadges() {
      const count = this.getItemCount();
      document.querySelectorAll('.cart-badge, [data-path="cart"] span:last-child, #drawer-item-count').forEach(badge => {
        badge.innerText = count;
        if (count > 0) {
          badge.classList.remove('hidden');
        }
      });
    }

    renderDrawer() {
      const listContainer = document.getElementById('drawer-items-list');
      const subtotalEl = document.getElementById('drawer-subtotal');
      const discountRow = document.getElementById('drawer-discount-row');
      const discountAmtEl = document.getElementById('drawer-discount-amt');
      const shippingAmtEl = document.getElementById('drawer-shipping-amt');
      const totalEl = document.getElementById('drawer-total');
      const checkoutText = document.getElementById('drawer-checkout-text');
      const itemCountEl = document.getElementById('drawer-item-count');
      const checkoutBtn = document.getElementById('drawer-checkout-btn');

      const shippingTrackerLabel = document.getElementById('shipping-tracker-label');
      const shippingProgressFill = document.getElementById('shipping-progress-fill');
      const shippingTrackerBar = document.getElementById('shipping-tracker-bar');

      if (!listContainer) return;

      const subtotal = this.getSubtotal();
      const discount = this.getDiscountAmount();
      const shipping = this.getShippingCost();
      const total = this.getTotal();
      const count = this.getItemCount();

      if (itemCountEl) itemCountEl.innerText = count;

      // Free shipping progress tracker
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingTrackerLabel.innerHTML = '🎉 <span class="text-[#2f6c00] font-bold">You qualified for FREE Sterile Delivery!</span>';
        shippingProgressFill.style.width = '100%';
        shippingProgressFill.className = 'h-full bg-[#2f6c00] rounded-full transition-all duration-500';
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingTrackerLabel.innerHTML = `Add <span class="font-bold text-[#002d59]">₹${remaining}</span> more for <span class="font-bold text-[#2f6c00]">FREE shipping</span>`;
        shippingProgressFill.style.width = percent + '%';
        shippingProgressFill.className = 'h-full bg-gradient-to-r from-[#004380] to-[#2f6c00] rounded-full transition-all duration-500';
      }

      // Coupon badge visibility
      const couponBadge = document.getElementById('active-coupon-badge');
      const couponInputBox = document.getElementById('drawer-promo-box');
      if (this.discountCode) {
        if (couponBadge) {
          couponBadge.classList.remove('hidden');
          document.getElementById('active-coupon-text').innerText = `Code ${this.discountCode} applied (${this.discountPercent}% OFF)`;
        }
        if (couponInputBox) couponInputBox.classList.add('hidden');
        if (discountRow) {
          discountRow.classList.remove('hidden');
          discountAmtEl.innerText = `-₹${discount}`;
        }
      } else {
        if (couponBadge) couponBadge.classList.add('hidden');
        if (couponInputBox) couponInputBox.classList.remove('hidden');
        if (discountRow) discountRow.classList.add('hidden');
      }

      // Populate Items
      if (this.cart.length === 0) {
        listContainer.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3">
            <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined text-[32px]">shopping_bag</span>
            </div>
            <h4 class="font-bold text-slate-700 text-sm">Your prescription bag is empty</h4>
            <p class="text-xs text-slate-500 max-w-xs">Start with clinical-grade cleansers or take our 2-min skin barrier diagnostic.</p>
            <a href="collection.html" onclick="window.DermaStore.closeCart()" class="mt-2 inline-block px-5 py-2.5 rounded-full bg-[#002d59] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#004380] transition-colors">
              Explore Formulations
            </a>
          </div>
        `;
        if (checkoutBtn) {
          checkoutBtn.classList.add('pointer-events-none', 'opacity-50');
        }
      } else {
        if (checkoutBtn) {
          checkoutBtn.classList.remove('pointer-events-none', 'opacity-50');
        }

        listContainer.innerHTML = this.cart.map(item => `
          <div class="pt-4 first:pt-0 flex gap-3.5 items-start">
            <div class="w-16 h-16 rounded-lg bg-[#f0f3ff] p-1 shrink-0 overflow-hidden flex items-center justify-center border border-slate-100">
              <img src="${item.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG-Sq63FRjKlvZmCnd8BvK9k8YB_8Ev_GuVpnbQOwqg-q3qprF167lK9nsrvmVuaWVgpZFpi1oGUQT3yoe26_Jj2rY-wxAQJfgrtVimx8pZAFKYqWVQ3_rSChqXYOb-2yIQ0I6PNV7UJ7FW1SaHv0BmQ9M-ZzqhlnhvD2_osQmbB1FPq2KPWw3J_2EYYkRMVyp-xvXk8iJkNSL2-lehz9BXCvfFadVzDFwvNcPCe6oqBj_sLZTfsW_KA'}" alt="${item.title}" class="w-full h-full object-contain" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-1">
                <h4 class="font-bold text-xs text-[#002d59] truncate leading-tight">${item.title}</h4>
                <button onclick="window.DermaStore.removeItem('${item.id}', '${item.size}')" class="text-slate-400 hover:text-red-600 transition-colors p-0.5" title="Remove item">
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>

              <div class="flex items-center gap-2 mt-1">
                <span class="bg-[#dee8ff] text-[#001c3b] font-bold text-[10px] px-2 py-0.5 rounded-full">${item.size}</span>
                <span class="text-[10px] text-slate-500">${item.category || 'Skincare'}</span>
              </div>

              <div class="flex items-center justify-between mt-3">
                <!-- Quantity Stepper -->
                <div class="flex items-center border border-slate-200 rounded-full bg-white px-2 py-0.5 shadow-xs">
                  <button onclick="window.DermaStore.updateQuantity('${item.id}', '${item.size}', -1)" class="text-slate-600 hover:text-[#002d59] font-bold px-1.5 text-xs">-</button>
                  <span class="font-bold text-xs text-slate-800 px-2">${item.quantity}</span>
                  <button onclick="window.DermaStore.updateQuantity('${item.id}', '${item.size}', 1)" class="text-slate-600 hover:text-[#002d59] font-bold px-1.5 text-xs">+</button>
                </div>

                <!-- Price -->
                <div class="text-right">
                  <span class="font-bold text-xs text-[#002d59]">₹${item.price * item.quantity}</span>
                  ${item.originalPrice ? `<span class="block text-[10px] text-slate-400 line-through">₹${item.originalPrice * item.quantity}</span>` : ''}
                </div>
              </div>
            </div>
          </div>
        `).join('');
      }

      // Summary
      if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
      if (shippingAmtEl) shippingAmtEl.innerText = shipping === 0 ? 'FREE' : `₹${shipping}`;
      if (totalEl) totalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
      if (checkoutText) checkoutText.innerText = `PROCEED TO CHECKOUT • ₹${total.toLocaleString('en-IN')}`;
    }
  }

  // Expose globally
  window.DermaStore = new DermaStoreEngine();
})();
