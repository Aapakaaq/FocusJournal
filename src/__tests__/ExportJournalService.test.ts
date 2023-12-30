import { ExportJournalService } from '../services/ExportJournalService'
import { FileSystemService } from '../services/FileSystemService';
import { PureStringConversionStrategy } from '../services/PureStringConversionStrategy';

import { promises as fsPromises } from 'fs';
import {describe, expect} from '@jest/globals';

describe('ExportJournalService integration test', () => {
  it('Using PureStringConversionStrategy, should write a file correctly', async () => {
    // Arrange
    const fileSystem = new FileSystemService();
    const exportService = new ExportJournalService(fileSystem);

    const data = ['Hello', 'world'];
    const filename = 'PureStringConversionStrategyIntegrationTest.txt';
    const strategy = new PureStringConversionStrategy();

    const filePath = __dirname + '/' + filename;

    try {
      // Act

      // Assert

    } finally {
    }
  });
});
