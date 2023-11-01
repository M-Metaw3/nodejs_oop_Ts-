import * as Joi from 'joi';

export default class JoiService {
  static validate(data: any, schema: Joi.Schema) {
    const { error, value } = schema.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
  }
}
