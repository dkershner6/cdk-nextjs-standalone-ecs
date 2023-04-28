# Next.js Standalone ECS Site

This is a standalone ECS site that uses Next.js and is deployed to AWS ECS.

It employs AWS EFS to share the `.next` directory between containers to facilitate proper Incremental Static Regeneration.

A Usage Guide will be available soon.

## Requirements

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