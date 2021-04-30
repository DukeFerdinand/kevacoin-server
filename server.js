#! /user/bin/node

const chalk = require("chalk");
const { spawn } = require("child_process");
require("dotenv").config();

const DefaultConfig = {
  ip: "localhost",
  allowedIps: ["0.0.0.0/0"],
  port: 5001,
  user: "keva-user",
  password: "J9JkYnPiXWqgRzg3vAA",
  quiet: false,
  threads: 1,
};

console.log();

const config = {
  ...DefaultConfig,
  ...{
    label: process.env.KEVA_LABEL,
    ip: process.env.KEVA_IP,
    allowedIps: JSON.parse(process.env.KEVA_ALLOWED_IPS),
    port: process.env.KEVA_PORT,
    user: process.env.KEVA_USER,
    password: process.env.KEVA_PASSWORD,
    quiet: process.env.KEVA_QUIET,
    threads: process.env.KEVA_THREADS,
  },
};

const commandArgs = [
  `-rpcbind=${config.ip}`,
  `-rpcallowip=${config.allowedIps.join(",")}`,
  `-rpcport=${config.port}`,
  `-rpcuser=${config.user}`,
  `-rpcpassword=${config.password}`,
  `-printtoconsole=${config.quiet ? 0 : 1}`,
  `-rpcthreads=${config.threads}`,
];

const Labels = {
  Process: chalk.green(config.label || "[kevacoind]"),
  Daemon: chalk.cyan("[kevacoind]"),
};
console.info(`${Labels.Process} Starting kevacoind proccess`);
console.info(`${Labels.Process} Using config - ${commandArgs.join(" ")}`);

// Start formatted server
// const child = spawn(command[0], [command[1]]);

// child.on("error", (e) => {
//   console.error("error", e.message);
// });

// // c is of type Buffer
// child.stdout.on("data", (c) => {
//   // Chunks might come through with multiple lines
//   const content = c
//     .toString("utf-8")
//     .split("\n")
//     .map((line) => `${Labels.Daemon} ${line}`)
//     .join("\n");
//   console.info(content);
// });
