import { AggregateRoot } from '@core/shared/domain/aggregate-root';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { CastMemberType } from './cast-member-type.vo';
import { CastMemberValidatorFactory } from './cast-member-validator';
import { CastMemberFakeBuilder } from './cast-member-fake.builder';

export type CastMemberConstructorProps = {
  cast_member_id?: CastMemberId;
  name: string;
  type: CastMemberType;
  created_at?: Date;
};

export type CastMemberCreateCommand = {
  name: string;
  type: CastMemberType;
};

export class CastMemberId extends Uuid {}

export class CastMember extends AggregateRoot {
  cast_member_id: CastMemberId;
  name: string;
  created_at: Date;
  type: CastMemberType;

  get entity_id() {
    return this.cast_member_id;
  }

  constructor(props: CastMemberConstructorProps) {
    super();
    this.cast_member_id = props.cast_member_id ?? new CastMemberId();
    this.name = props.name;
    this.created_at = props.created_at ?? new Date();
    this.type = props.type;
  }

  static create(props: CastMemberCreateCommand): CastMember {
    const castMember = new CastMember(props);
    castMember.validate(['name']);
    return castMember;
  }

  validate(fields?: string[]) {
    const validator = CastMemberValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  changeName(name: string): void {
    this.name = name;
    this.validate(['name']);
  }

  changeType(type: CastMemberType): void {
    this.type = type;
  }

  static fake() {
    return CastMemberFakeBuilder;
  }

  toJSON() {
    return {
      cast_member_id: this.cast_member_id.id,
      name: this.name,
      type: this.type.type,
      created_at: this.created_at,
    };
  }
}
