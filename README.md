# Next.js Standalone ECS Site

[NPM Package](https://www.npmjs.com/package/cdk-nextjs-standalone-ecs)

[![View on Construct Hub](https://constructs.dev/badge?package=cdk-nextjs-standalone-ecs)](https://constructs.dev/packages/cdk-nextjs-standalone-ecs)

Deploy a Next.js site to AWS ECS supprting all version 13 features, including properly functioning, efficient Incremental Static Regeneration and Image Optimization.

This construct employs AWS EFS to share the `.next` directory between containers, as is [recommended by Vercel](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr).

## Getting Started

A full example including custom domain, SSL, and Cloudfront is in the `/example` folder. This construct can also be used with only a VPC and ALB as well, with no caching or custom domain.

You can see the requirements for this construct there, but they are also spelled out in detail below.

The full API of this construct is available in the [API.md](API.md) file.

## Requirements

### next.config.?s

- `output` must be set to `standalone`. This is what Vercel recommends for Docker based deployments.
- `experimental.isrMemoryCacheSize` must be set to zero. Without this, you can get odd responses when using ISR and having multiple containers.

### Scripts

Some minimal scripts that handle moving files around when a new build is created are required. They are available in the `docker` folder.

### Dockerfile

The following should be inserted during the final steps, just after the standalone folder is copied.

```
# Additions from NextjsStandaloneEcsSite
# We use curl to run the health check on the container
RUN apk add --update curl
# Copy our scripts to the root of the container
COPY --from=builder --chown=nextjs:nodejs app/docker ./
# Move the build out of the way of our .next folder shared across containers
RUN mv ./.next ./.next.currentBuild
RUN mkdir -p ./.next
RUN chown nextjs:nodejs ./.next
# End additions from NextjsStandaloneEcsSite
```

In addition, the final line in the Dockerfile should be changed to:

```
ENTRYPOINT ["sh","./startup.sh"]
```

Instead of any CMD or existing ENTRYPOINT. You can add to startup.sh if you need to run additional commands before the container starts.
