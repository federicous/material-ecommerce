const KEY = 'brm-checkout-key';
const SNAPSHOT = 'brm-checkout-snapshot';

export function getCheckoutKey(storage, createId, cart, user, target, budget) {
  const snapshot = JSON.stringify({ user: user || '', target: target ? {email: target.email || '', vendedor: target.vendedor || '', descuento: target.descuento ?? null, state: target.state ?? null} : '', budget: !!budget, items: cart.map(item => JSON.stringify(item)).sort() });
  let key = storage.getItem(KEY);
  const previous = storage.getItem(SNAPSHOT);
  // A previous ambiguous request may already have created an order. Never send
  // a changed cart with that key, or silently discard the previous attempt.
  if (key && previous !== snapshot) throw new Error('CHECKOUT_CHANGED');
  if (!key) {
    key = createId();
    storage.setItem(SNAPSHOT, snapshot);
    storage.setItem(KEY, key);
  }
  return key;
}

export function clearCheckoutKey(storage) {
  storage.removeItem(KEY);
  storage.removeItem(SNAPSHOT);
}
