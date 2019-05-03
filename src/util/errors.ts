import { WError } from 'verror';

export class DatabaseError extends WError {
  constructor(cause: Error | null, message: string, ...params: any[]) {
    super({ cause, name: 'DatabaseError' }, message, ...params);
  }
}

export class ValidationError extends WError {
  constructor(name: string, message: string, ...params: any[]) {
    super({ name }, message, params);
  }
}

export class RouteNotFoundError extends ValidationError {
  constructor(from: string, to: string) {
    super('RouteNotFoundError', `Route ${from}-${to} not found`);
  }
}

export class ChannelNotFoundError extends ValidationError {
  constructor(name: string) {
    super('ChannelNotFoundError', `Channel ${name} not found`);
  }
}

export class NotFoundError extends WError {
  constructor(message?: string) {
    super({ name: 'NotFoundError' }, message || 'NOT_FOUND');
  }
}

export class InvalidSearchParams extends WError {
  constructor(message?: string) {
    super({ name: 'InvalidSearchParams' }, message || 'SEARCH_PARAMS_INVALID');
  }
}

class InvalidParameterError extends ValidationError {
  constructor(name:string, field:string) {
    super(name, '%s parameter is invalid', field);
  }
}

export class AdultsValidationError extends InvalidParameterError {
  constructor() {
    super('AdultsValidationError', 'adults');
  }
}

export class InfantsValidationError extends InvalidParameterError {
  constructor() {
    super('InfantsValidationError', 'infants');
  }
}

export class ChildrenValidationError extends InvalidParameterError {
  constructor() {
    super('ChildrenValidationError', 'children');
  }
}

export class PassengersQuantityValidationError extends ValidationError {
  constructor(passengersLimit: number) {
    super(
      'PassengersQuantityValidationError',
      `The total number of passengers exceeds the maximum ${passengersLimit} allowed`,
    );
  }
}

export class AdultsGreaterInfantsValidationError extends ValidationError {
  constructor() {
    super(
      'AdultsGreaterInfantsValidationError',
      'The number of adults must be greater than that of infants',
    );
  }
}

export class ChannelValidationError extends InvalidParameterError {
  constructor() {
    super('ChannelValidationError', 'channel');
  }
}


export class FromValidationError extends InvalidParameterError {
  constructor() {
    super('FromValidationError', 'from');
  }
}

export class ToValidationError extends InvalidParameterError {
  constructor() {
    super('ToValidationError', 'to');
  }
}

export class OutboundDateValidationError extends InvalidParameterError {
  constructor() {
    super('OutboundDateValidationError', 'outboundDate');
  }
}

export class InboundDateValidationError extends InvalidParameterError {
  constructor() {
    super('InboundDateValidationError', 'inboundDate');
  }
}

export class CabinValidationError extends InvalidParameterError {
  constructor() {
    super('CabinValidationError', 'cabin');
  }
}

export class TripTypeValidationError extends InvalidParameterError {
  constructor() {
    super('TripTypeValidationError', 'tripType');
  }
}

export class PastOutboundDateError extends ValidationError {
  constructor() {
    super('PastOutboundDateError', 'outboundDate cannot be in the past');
  }
}

export class PastInboundDateError extends ValidationError {
  constructor() {
    super('PastInboundDateError', 'inboundDate cannot be in the past');
  }
}

export class InboundBeforeOutboundError extends ValidationError {
  constructor() {
    super('InboundBeforeOutboundError', 'inboundDate cannot be before outboundDate');
  }
}

export class InboundAheadOfDaysLimitError extends ValidationError {
  constructor(limitDays: number) {
    super('InboundAheadOfDaysLimitError', `inboundDate greather than ${limitDays}`);
  }
}

export class OutboundAheadOfDaysLimitError extends ValidationError {
  constructor(limitDays: number) {
    super('OutboundAheadOfDaysLimitError', `outboundDate greather than ${limitDays}`);
  }
}

export class UnknownParameterError extends ValidationError {
  public details:any;
  constructor(unknownFields:any) {
    super('UnknownParameterError', 'unknown parameters are not allowed');
    this.details = { unknownFields };
  }
}
