import { AggregateRoot } from '@core/shared/domain/aggregate-root';
import { ValueObject } from '@core/shared/domain/value-object';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { CastMemberType } from './cast-member-type.vo';

export type CastMemberConstructorProps = {
  cast_member_id?: CastMemberId;
  name: string;
  created_at?: Date;
  type: CastMemberType;
};

export class CastMember extends AggregateRoot {
  cast_member_id: CastMemberId;
  name: string;
  created_at: Date;
  type: CastMemberType;

  toJSON() {
    throw new Error('Method not implemented.');
  }

  get entity_id(): ValueObject {
    return this.cast_member_id;
  }

  constructor(props: CastMemberConstructorProps) {
    super();
    this.cast_member_id = props.cast_member_id ?? new CastMemberId();
    this.name = props.name;
    this.created_at = props.created_at ?? new Date();
    this.type = props.type;
  }
}

export class CastMemberId extends Uuid {}
