<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

class CartItem
{
    #[Groups(['cart:write', 'cart:read'])]
    private Product $product;

    #[Groups(['cart:write', 'cart:read'])]
    private ?Color $color = null;

    #[Groups(['cart:write', 'cart:read'])]
    private int $quantity = 1;

    public function __construct(Product $product, ?Color $color = null, int $quantity = 1)
    {
        $this->product = $product;
        $this->color = $color;
        $this->quantity = $quantity;
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    /**
     * Porównuje dwa CartItem, aby sprawdzić czy to ten sam produkt+kolor
     */
    public function matches(CartItem $cartItem): bool
    {
        $thisKey = sprintf(
            '%s_%s',
            $this->getProduct()->getId(),
            $this->getColor() ? $this->getColor()->getId() : 'no_color'
        );

        $thatKey = sprintf(
            '%s_%s',
            $cartItem->getProduct()->getId(),
            $cartItem->getColor() ? $cartItem->getColor()->getId() : 'no_color'
        );

        return $thisKey === $thatKey;
    }
}
