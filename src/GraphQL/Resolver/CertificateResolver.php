<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Certificate;

class CertificateResolver implements ResolverInterface, AliasedInterface {

    /** @var EntityManagerInterface $em */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        if ($args['id']) {
            $project = $this->em->getRepository(Certificate::class)->find($args['id']);
            return $project;
        } else if ($args['title']) {
            $project = $this->em->getRepository(Certificate::class)->findOneBy([
                'title' => $args['title']
            ]);
            return $project;
        }
    }

    public static function getAliases(): array
    {
        return [
            'resolve' => 'Certificate'
        ];
    }
}
