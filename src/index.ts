import { context, getOctokit } from '@actions/github';
import { getInput, setOutput, startGroup, info, endGroup, warning } from '@actions/core';
import { GetResponseTypeFromEndpointMethod  } from '@octokit/types';
import fs from 'fs-extra';
import path from 'path';

export const myToken = getInput('token');
export const octokit = getOctokit(myToken);

type GetContentResponseType = GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>['data'];


function nodeBase64ToUtf8(data: string) {
  return Buffer.from(data, "base64").toString("utf-8");
}

async function getFileContents(branch: string): Promise<GetContentResponseType | undefined> {
  const {owner, repo, filepath} = getInputs()
  try {
    const body = { owner, repo, ref: branch, path: filepath }
    startGroup(`👉 File Content Parameters:`);
      info(`👉 ${JSON.stringify(body, null, 2)}`);
    endGroup();
    const { data } = await octokit.rest.repos.getContent(body);
    return data;
  } catch (err) {
    warning(`👉 Get File Contents: ${err instanceof Error ? err.message : err}`);
    return;
  }
}

async function getBranch(): Promise<string> {
  const { branch } = getInputs()
  if (branch !== null) {
    return Promise.resolve(branch);
  }
  const { data } = await octokit.rest.repos.get(context.repo);
  return data.default_branch;
}

export const getInputs = () => {
  const branch = getInput('branch');
  const filepath = getInput('path') || '';
  const localfile = getInput('localfile') || '';
  return {
    ...context.repo,
    filepath, branch, localfile,
  }
}

;(async () => {
  const { localfile } = getInputs()
  const branch = await getBranch()
  info(`👉 branch: (${branch || '-'})`);

  if (localfile) {
    const currentFilePath = path.resolve(localfile)
    info(`👉 LocalFile: (${currentFilePath || '-'})`);
    const content = await fs.readFile(currentFilePath)
    setOutput('content', content.toString());
    // * dev: 2114n,
    // * ino: 48064969n,
    // * mode: 33188n,
    // * nlink: 1n,
    // * uid: 85n,
    // * gid: 100n,
    // * rdev: 0n,
    // * size: 527n,
    // * blksize: 4096n,
    // * blocks: 8n,
    // * atimeMs: 1318289051000n,
    // * mtimeMs: 1318289051000n,
    // * ctimeMs: 1318289051000n,
    // * birthtimeMs: 1318289051000n,
    // * atimeNs: 1318289051000000000n,
    // * mtimeNs: 1318289051000000000n,
    // * ctimeNs: 1318289051000000000n,
    // * birthtimeNs: 1318289051000000000n,
    // * atime: Mon, 10 Oct 2011 23:24:11 GMT,
    // * mtime: Mon, 10 Oct 2011 23:24:11 GMT,
    // * ctime: Mon, 10 Oct 2011 23:24:11 GMT,
    // * birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
    const stat = await fs.stat(currentFilePath)
    setOutput('size', stat.size);
    return
  }

  const currentFile = await getFileContents(branch);
  if (currentFile && 'content' in currentFile) {
    const fileContent = nodeBase64ToUtf8(currentFile.content || '');
    setOutput('content', fileContent);
    setOutput('size', currentFile.size);
    setOutput('encoding', currentFile.encoding);
    setOutput('name', currentFile.name);
    setOutput('path', currentFile.path);
    setOutput('sha', currentFile.sha);
    setOutput('url', currentFile.url);
    setOutput('git_url', currentFile.git_url);
    setOutput('html_url', currentFile.html_url);
    setOutput('download_url', currentFile.download_url);
    setOutput('target', currentFile.target);
    setOutput('submodule_git_url', currentFile.submodule_git_url);
    startGroup(`👉 File Content (JSON):`);
      info(`👉 ${JSON.stringify(currentFile, null, 2)}`);
    endGroup();
    startGroup(`👉 File Content:`);
      info(`👉 ${fileContent}`);
    endGroup();
  } else {
    startGroup(`👉 File Content:`);
      warning(`👉 ${JSON.stringify(currentFile, null, 2)}`);
    endGroup();
  }
})();