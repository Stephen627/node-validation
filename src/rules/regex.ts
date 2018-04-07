import Rule from '../rule';

class Regex implements Rule {

  /**
   * @inheritDoc
   */
  public validate (data: string, extraInformation: string): boolean {
    const regex = new RegExp(extraInformation);
    return regex.test(data);
  }

  /**
   * @inheritDoc
   */
  public getErrorString (key: string, extraInformation: string): string {
    return `${key} does not meet the required format of ${extraInformation}`;
  }

}

export default Regex;
