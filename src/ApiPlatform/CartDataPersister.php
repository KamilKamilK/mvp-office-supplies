<?php

namespace App\ApiPlatform;

use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\Cart;
use Symfony\Component\HttpFoundation\RequestStack;

class CartDataPersister implements ProcessorInterface
{
    private RequestStack $requestStack;

    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }

    private function getSession()
    {
        return $this->requestStack->getSession();
    }

    public function persist($cart)
    {
        $this->getSession()->set(self::getKey($cart->getId()), $cart);
        $this->getSession()->set('_cart_id', $cart->getId());
    }

    public function supports($data, array $uriVariables = [], array $operationName = []): bool
    {
        return $data instanceof Cart;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $this->persist($data);
        return $data;
    }

    public function remove($cart)
    {
        $this->getSession()->remove(self::getKey($cart->getId()));
        $this->getSession()->remove('_cart_id');
    }

    public static function getKey(string $uuid)
    {
        return sprintf('_cart_%s', $uuid);
    }
}