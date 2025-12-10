<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiProperty;
use Ramsey\Uuid\Uuid;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['cart:read']],
    denormalizationContext: ['groups' => ['cart:write']],
    operations: [
        new Get(),
        new Put(),
        new Delete(),
        new Post(),
    ]
)]
class Cart
{
    #[ApiProperty(identifier: true)]
    #[Groups(['cart:read'])]
    private string $id;

    /**
     * @var CartItem[]
     */
    #[Groups(['cart:read', 'cart:write'])]
    private array $items = [];

    public function __construct()
    {
        $this->id = Uuid::uuid4()->toString();
    }

    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return CartItem[]|array
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public function addItem(CartItem $cartItem): void
    {
        foreach ($this->items as $key => $item) {
            if ($cartItem->matches($item)) {
                $this->items[$key] = $cartItem;
                return;
            }
        }

        $this->items[] = $cartItem;
    }

    public function removeItem(CartItem $cartItem): void
    {
        foreach ($this->items as $key => $item) {
            if ($cartItem->matches($item)) {
                unset($this->items[$key]);
                $this->items = array_values($this->items);
                return;
            }
        }
    }
}
