import { escapeNewLine } from '../../Utils/StringUtils';
import { IDataToContentStrategy } from './IDataToContentStrategy';

export class PureStringConversionStrategy implements IDataToContentStrategy  {
    /*
     * Convert data to string and escapes all new lines (\n).
     */
    public convertData(data : string[]) : string {
        const stringValue = data.join(' ');
        return escapeNewLine(stringValue);
    }
}
