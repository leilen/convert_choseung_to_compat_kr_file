import * as fs from 'fs';
import * as Hangul from 'hangul-js';

const pairDic: {[key: number]: number} = {
  4352: 12593,
  4353: 12594,
  4354: 12596,
  4355: 12599,
  4356: 12600,
  4357: 12601,
  4358: 12609,
  4359: 12610,
  4360: 12611,
  4361: 12613,
  4362: 12614,
  4363: 12615,
  4364: 12616,
  4365: 12617,
  4366: 12618,
  4367: 12619,
  4368: 12620,
  4369: 12621,
  4370: 12622,
  4520: 12593,
  4521: 12594,
  4522: 12595,
  4523: 12596,
  4524: 12597,
  4525: 12598,
  4526: 12599,
  4527: 12601,
  4528: 12602,
  4529: 12603,
  4530: 12604,
  4531: 12605,
  4532: 12606,
  4533: 12607,
  4534: 12608,
  4535: 12609,
  4536: 12610,
  4537: 12612,
  4538: 12613,
  4539: 12614,
  4540: 12615,
  4541: 12616,
  4542: 12618,
  4543: 12619,
  4544: 12620,
  4545: 12621,
  4546: 12622,
  4449: 12623,
  4450: 12624,
  4451: 12625,
  4452: 12626,
  4453: 12627,
  4454: 12628,
  4455: 12629,
  4456: 12630,
  4457: 12631,
  4458: 12632,
  4459: 12633,
  4460: 12634,
  4461: 12635,
  4462: 12636,
  4463: 12637,
  4464: 12638,
  4465: 12639,
  4466: 12640,
  4467: 12641,
  4468: 12642,
  4469: 12643,
};
const jaStart = 4352;
const jaEnd = 4370;
const middleStart = 4449;
const middleEnd = 4469;
const compatStart = 12593;

function getFileList(dirPath: string) {
  const fileArr = fs.readdirSync(dirPath);
  return fileArr;
}
function returnConvertedFileName(fileName: string): string {
  const tempStringArr = [];
  for (const c of fileName.split('')) {
    if (pairDic[c.charCodeAt(0)]) {
      tempStringArr.push(String.fromCharCode(pairDic[c.charCodeAt(0)]));
    } else {
      tempStringArr.push(c);
    }
  }
  return Hangul.assemble(tempStringArr);
}
function changeFileName(path: string, fileName: string) {
  const newName = returnConvertedFileName(fileName);
  if (fileName !== newName) {
    console.log(`${path}/${newName}`);
    fs.renameSync(`${path}/${fileName}`, `${path}/${newName}`);
  }
}
function loop(path: string) {
  const fileArr = getFileList(path);
  for (const fileName of fileArr) {
    const filePath = `${path}/${fileName}`;
    if (fs.lstatSync(filePath).isDirectory()) {
      loop(filePath);
    }
    changeFileName(path, fileName);
  }
}

function main() {
  let path = '';
  try {
    path = process.argv[2];
  } catch (e) {
    return;
  }
  console.log(path);
  if (fs.lstatSync(path).isDirectory()) {
    loop(path);
  }
}

main();
