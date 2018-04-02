import Rule from '../rule'

class Required implements Rule {

  /**
   * @inheritDoc
   */
  public validate (data: string): boolean {
    return !!data
  }

  /**
   * @inheritDoc
   */
  public getErrorString (key: string): string {
    return `${key} is required`
  }

}

export default Required
