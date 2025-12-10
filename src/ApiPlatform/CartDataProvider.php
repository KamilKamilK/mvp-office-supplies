<?php

namespace App\ApiPlatform;

use ApiPlatform\State\ProviderInterface;
use App\Entity\Cart;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use ApiPlatform\Metadata\Operation;

class CartDataProvider implements ProviderInterface
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

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?object
    {
        $id = $uriVariables['id'] ?? null;
        if ($id === null) {
            return null;
        }

        $key = CartDataPersister::getKey($id);
        if (!$this->getSession()->has($key)) {
            throw new NotFoundHttpException('Cart not found');
        }

        return clone $this->getSession()->get($key);
    }
}