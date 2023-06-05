import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

interface SourceCode {
  rawCode: string;
  typeName: string; // convert to hash
}

interface Params {
  sources: string[] | undefined;
}

const sourceCodes: SourceCode[] = [
  {
    rawCode:
      '// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.9;\r\n\r\ninterface ISayHello {\r\n\tevent Hello();\r\n\tfunction sayHello() external returns (bool);\r\n}\r\n\r\ncontract GoodContractV2 {\r\n    bool constant public iAmGood = true;\r\n\r\n    constructor() {}\r\n\r\n    function isGood() public pure returns(bool) {\r\n        return iAmGood;\r\n    }\r\n\r\n    function tryHello(address interactionContract) public {\r\n        ISayHello(interactionContract).sayHello();\r\n    }\r\n}',
    typeName: 'good-contract',
  },
];

@Injectable()
export class ContractTypeService {
  constructor(private contractTypeService: HttpService) {}
  public getContractType(params: Params): string {
    if (!params.sources) {
      throw new BadRequestException('Missing params');
    }

    for (const sourceCode of sourceCodes) {
      for (const source of params.sources) {
        if (
          source.includes(sourceCode.rawCode) ||
          source == sourceCode.rawCode
        ) {
          return ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(sourceCode.typeName),
          );
        } else {
          console.log('does not include', sourceCode.typeName);
        }
      }
    }

    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes('unknown'));
  }
}
