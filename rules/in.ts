import Rule from '../rule';

class In implements Rule {

  /**
   * @inheritDoc
   */
  public validate (data: string, extraInformation: string): boolean {
    return extraInformation.split(',').indexOf(data) > -1;
  }

  /**
   * @inheritDoc
   */
  public getErrorString (key: string, extraInformation: string): string {
    return `${key} must exist in ${extraInformation}`;
  }

}

export default In;
