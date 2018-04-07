/**
 * A generic interface for all rules
 *
 * @class Rule
 */
interface Rule {

  /**
   * Checks if the data provided is validate against this rule
   *
   * @param string data             the data to check if it is valid
   * @param string extraInformation any extra information required to validate the data
   *
   * @return boolean
   */
  validate (data: string, extraInformation?: string): boolean;

  /**
   * Gets the error string for the given key
   *
   * @param string key              the key to use in the error string
   * @param string extraInformation any extra information to appear in the error string
   *
   * @return string
   */
  getErrorString (key: string, extraInformation?: string): string;

}

export default Rule;
