# Create the project from scratch

<p>
create a folder ( name = fastify_mysql_sequelize_server)
</p>

<p>
initialize the node project and create package.json using this command on terminal and choose blank template.
</p>     
<p>

       bun init

</p>
       
       bunx init -y
</p>
<h2>
1. create "src" folder & create a file name "app.ts"
</h2>
<p>

    mkdir src && cd src &&  echo.> app.ts && cd ..

</p>

<p>
    Install dependencies
</p>

    bun add fastify fastify-plugin @fastify/cors dotenv

<p>

<p>
    Install Development dependencies
</p>
</p>

    bun add --dev rimraf prettier

<p>
<p>
    Install type dev dependencies
</p>
</p>

    bun add --dev @types/cors @types/uuid

<p>

<p>

    "scripts": {
    "build": "rimraf dist && bun build --entrypoints ./src/app.ts --outdir ./dist --format esm --splitting --minify --target node",
    "prestart": "bun run build",
    "start": "bun ./dist/app.js",
    "dev": "bun run --watch ./src/app.ts",
    "prettier": "prettier --write ."
    },

</p>

<p>Adding database packages to create and connect mysql database
</p>

<p>
    
    bun add sequelize mysql2 pg-hstore

</p>

<p>Password encryption : Use Bcryptjs </p>

<p>

    bun add bcryptjs

</p>

<p>Install middlewares, cors,Proxy, DDos Protection support for fastify </p>

<p>

    bun add @fastify/cors

</p>

<p>Install Redis (ioredis package) for otp authentication with nodemailer & ejs for email template </p>

<p>

    bun add ioredis ejs nodemailer

</p>

<p>

    bun add --dev @types/ejs @types/nodemailer

</p>
