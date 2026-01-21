import { ShoppingCart, Tag, Truck, Shield, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../form/Input';
import { useState } from 'react';

/**
 * CartSummary Component
 * Displays order summary with totals, promo code input, and checkout button
 * 
 * @param {Object} props
 * @param {number} props.subtotal - Cart subtotal amount
 * @param {number} props.itemCount - Number of items in cart
 * @param {Function} props.onCheckout - Checkout callback function
 * @param {number} [props.tax=0.1] - Tax rate (default 10%)
 * @param {number} [props.shipping=0] - Shipping cost (0 for free)
 * @param {number} [props.discount=0] - Discount amount
 * @param {boolean} [props.sticky=true] - Whether summary should be sticky on scroll
 */
const CartSummary = ({
    subtotal,
    itemCount,
    onCheckout,
    tax = 0.1,
    shipping = 0,
    discount = 0,
    sticky = true,
}) => {
    const [promoCode, setPromoCode] = useState('');
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);

    // Calculate totals
    const taxAmount = subtotal * tax;
    const total = subtotal + taxAmount + shipping - discount;

    const handleApplyPromo = () => {
        setIsApplyingPromo(true);
        setPromoError('');

        // Simulate promo code validation
        setTimeout(() => {
            // Demo promo codes
            const validPromoCodes = {
                'SAVE10': { type: 'percentage', value: 10, label: '10% Off' },
                'SAVE20': { type: 'percentage', value: 20, label: '20% Off' },
                'FREE50': { type: 'fixed', value: 50, label: '$50 Off' },
            };

            const upperPromo = promoCode.toUpperCase();

            if (validPromoCodes[upperPromo]) {
                setAppliedPromo({
                    code: upperPromo,
                    ...validPromoCodes[upperPromo]
                });
                setPromoCode('');
                setPromoError('');
            } else {
                setPromoError('Invalid promo code');
            }

            setIsApplyingPromo(false);
        }, 800);
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoError('');
    };

    // Calculate discount from promo
    const promoDiscount = appliedPromo
        ? appliedPromo.type === 'percentage'
            ? subtotal * (appliedPromo.value / 100)
            : appliedPromo.value
        : 0;

    const finalTotal = total - promoDiscount;

    return (
        <div className={sticky ? 'sticky top-24' : ''}>
            <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-neutral-900">
                        Order Summary
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <ShoppingCart className="h-4 w-4" />
                        <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                    </div>
                </div>

                {/* Promo Code Section */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">
                        Promo Code
                    </label>

                    {appliedPromo ? (
                        <div className="flex items-center justify-between p-3 bg-success-50 border border-success-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-success-600" />
                                <div>
                                    <p className="text-sm font-semibold text-success-900">
                                        {appliedPromo.code}
                                    </p>
                                    <p className="text-xs text-success-700">
                                        {appliedPromo.label} applied
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemovePromo}
                                className="text-xs text-success-700 hover:text-success-800 font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <Input
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="flex-1"
                                    error={promoError}
                                    disabled={isApplyingPromo}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && promoCode) {
                                            handleApplyPromo();
                                        }
                                    }}
                                />
                                <Button
                                    variant="outline"
                                    onClick={handleApplyPromo}
                                    disabled={!promoCode || isApplyingPromo}
                                    loading={isApplyingPromo}
                                    className="whitespace-nowrap"
                                >
                                    Apply
                                </Button>
                            </div>
                            {promoError && (
                                <p className="text-xs text-danger-600">{promoError}</p>
                            )}
                            {/* Demo codes hint */}
                            <p className="text-xs text-neutral-500">
                                Try: SAVE10, SAVE20, or FREE50
                            </p>
                        </div>
                    )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-neutral-700">
                        <span>Subtotal</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>

                    {shipping === 0 ? (
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Truck className="h-4 w-4 text-success-600" />
                                <span className="text-neutral-700">Shipping</span>
                            </div>
                            <span className="font-medium text-success-600">Free</span>
                        </div>
                    ) : (
                        <div className="flex justify-between text-neutral-700">
                            <span>Shipping</span>
                            <span className="font-medium">{formatCurrency(shipping)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-neutral-700">
                        <span>Tax (estimated)</span>
                        <span className="font-medium">{formatCurrency(taxAmount)}</span>
                    </div>

                    {promoDiscount > 0 && (
                        <div className="flex justify-between text-success-700">
                            <span>Discount</span>
                            <span className="font-medium">-{formatCurrency(promoDiscount)}</span>
                        </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-neutral-200 pt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-neutral-900">Total</span>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-primary-600">
                                    {formatCurrency(finalTotal)}
                                </div>
                                {promoDiscount > 0 && (
                                    <div className="text-sm text-neutral-500 line-through">
                                        {formatCurrency(total)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Button */}
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-3"
                    onClick={onCheckout}
                >
                    <CreditCard className="h-5 w-5" />
                    Proceed to Checkout
                </Button>

                <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={() => window.history.back()}
                >
                    Continue Shopping
                </Button>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                        Why Shop With Us
                    </h3>
                    <ul className="space-y-2.5">
                        <li className="flex items-start gap-2.5 text-sm text-neutral-600">
                            <Truck className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                            <span>Free shipping on all orders</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm text-neutral-600">
                            <Shield className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                            <span>30-day money-back guarantee</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm text-neutral-600">
                            <CreditCard className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                            <span>Secure checkout with SSL encryption</span>
                        </li>
                    </ul>
                </div>

                {/* Accepted Payment Methods */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500 text-center mb-3">
                        We accept
                    </p>
                    <div className="flex items-center justify-center gap-3 opacity-60">
                        <div className="w-10 h-6 bg-neutral-200 rounded flex items-center justify-center text-xs font-bold">
                            VISA
                        </div>
                        <div className="w-10 h-6 bg-neutral-200 rounded flex items-center justify-center text-xs font-bold">
                            MC
                        </div>
                        <div className="w-10 h-6 bg-neutral-200 rounded flex items-center justify-center text-xs font-bold">
                            AMEX
                        </div>
                        <div className="w-10 h-6 bg-neutral-200 rounded flex items-center justify-center text-xs font-bold">
                            PP
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CartSummary;