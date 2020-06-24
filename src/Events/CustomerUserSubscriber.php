<?php

namespace App\Events;

use App\Entity\Customer;
use PhpParser\Builder\Function_;
use PhpParser\Node\Expr\FuncCall;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class CustomerUserSubscriber implements EventSubscriberInterface {

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static Function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(GetResponseForControllerResultEvent $event) {
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($customer instanceof Customer && $method === "POST") {

            $user = $this->security->getUser();

            if($user) {
                $customer->setUser($user);
            }
            
            
        }

    }
}