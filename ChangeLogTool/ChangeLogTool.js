// Reference: https://medium.com/better-programming/create-your-own-changelog-generator-with-git-aefda291ea93

const child = require("child_process");
const fs = require("fs");
const gitUrl = "http://10.4.0.19:8088/rock10/la/commits/"

const output = child
  .execSync(`git log --format=%B%H----DELIMITER---- origin/develop..origin/Art_VFX`)
  .toString("utf-8");

const commitsArray = output
  .split("----DELIMITER----\n")
  .map(commit => {
    const [message, sha] = commit.split("\n");

    return { sha, message };
  })
  .filter(commit => Boolean(commit.sha));

const currentChangelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
const currentVersion = Number(require("./package.json").version);
let newChangelog = `# Version ${currentVersion} (${
  new Date().toISOString().split("T")[0]
})\n\n`;

const features = [];
const fixs = [];
const perfs = [];
const refactors = [];

commitsArray.forEach(commit => {
  if (commit.message.startsWith("feat: ")) {
    features.push(
      `* ${commit.message.replace("feat: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitUrl}${commit.sha}))\n`
    );
  }
  if (commit.message.startsWith("fix: ")) {
    fixs.push(
      `* ${commit.message.replace("fix: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitUrl}${commit.sha}))\n`
    );
  }
  if (commit.message.startsWith("perf: ")) {
    perfs.push(
      `* ${commit.message.replace("perf: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitUrl}${commit.sha}))\n`
    );
  }
  if (commit.message.startsWith("refactor: ")) {
    refactors.push(
      `* ${commit.message.replace("refactor: ", "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitUrl}${commit.sha}))\n`
    );
  }
});

if (features.length) {
  newChangelog += `## 新增\n`;
  features.forEach(feature => {
    newChangelog += feature;
  });
  newChangelog += '\n';
}

if (fixs.length) {
  newChangelog += `## 修正\n`;
  fixs.forEach(fix => {
    newChangelog += fix;
  });
  newChangelog += '\n';
}

if (perfs.length) {
  newChangelog += `## 優化\n`;
  perfs.forEach(perf => {
    newChangelog += perf;
  });
  newChangelog += '\n';
}

if (refactors.length) {
  newChangelog += `## 重構\n`;
  refactors.forEach(refactor => {
    newChangelog += refactor;
  });
  newChangelog += '\n';
}

// prepend the newChangelog to the current one
fs.writeFileSync("./CHANGELOG.md", `${newChangelog}${currentChangelog}`);