import { Uuid } from "@core/shared/domain/value-objects/uuid.vo"
import { CastMemberType } from "../cast-member-type.vo"
import { CastMember, CastMemberId } from "../cast-member.aggregate"

describe('Category Without Validator Unit Tests', () => {
  beforeEach(() => {
    CastMember.prototype.validate = jest
      .fn()
      .mockImplementation(CastMember.prototype.validate)
  })

  test('constructor of a cast member', () => {
    console.log('CastMemberType', CastMemberType.createADirector())
    const director = CastMemberType.createADirector();
    let castMember = new CastMember({ name: 'Fulano', type: director })

    expect(castMember.cast_member_id).toBeInstanceOf(CastMemberId)
    expect(castMember.name).toBe('Fulano')
    expect(castMember.type).toEqual(director)
    expect(castMember.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    castMember = new CastMember({ name: 'Fulano', type: director, created_at })

    expect(castMember.cast_member_id).toBeInstanceOf(CastMemberId)
    expect(castMember.name).toBe('Fulano')
    expect(castMember.type).toBe(director)
    expect(castMember.created_at).toBe(created_at)
  })

  describe('create command', () => {
    test('should create a cast member', () => {
      const director = CastMemberType.createADirector();
      const castMember = CastMember.create({
        name: "Test",
        type: director
      })

      expect(castMember.name).toBe('Test')
      expect(castMember.type).toBe(director)
      expect(CastMember.prototype.validate).toHaveBeenCalledTimes(1);
      expect(castMember.notification.hasErrors()).toBe(false);
    })
  })

  describe('cast_member_id', () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new Uuid() }]

    test.each(arrange)(
      'should be %j',
      (props) => {
        const castMember = new CastMember(props as any);
        expect(castMember.cast_member_id).toBeInstanceOf(CastMemberId);
      }
    );
  })

  test('should change name', () => {
    const director = CastMemberType.createADirector();
    const castMember = new CastMember({ name: 'Fulano', type: director })
    castMember.changeName('Ciclano')
    expect(castMember.name).toBe('Ciclano')
    expect(CastMember.prototype.validate).toHaveBeenCalledTimes(1);
    expect(castMember.notification.hasErrors()).toBe(false);
  })

  test('should change type', () => {
    const director = CastMemberType.createADirector();
    const castMember = new CastMember({ name: 'Fulano', type: director })
    const actor = CastMemberType.createAnActor()
    castMember.changeType(actor)
    expect(castMember.type).toBe(actor)
  })
})

describe('CastMember Validator', () => {
  describe('create command', () => {
    test('should an invalid cast member with name property', () => {
      const castMember = CastMember.create({ name: 't'.repeat(256) } as any);
      expect(castMember.notification.hasErrors()).toBe(true);
      expect(castMember.notification).notificationContainsErrorMessages([
        {
          name: ['name must be shorter than or equal to 255 characters'],
        },
      ]);
    });
  });

  describe('changeName method', () => {
    it('should a invalid cast member using name property', () => {
      const castMember = CastMember.fake().aDirector().build();
      castMember.changeName('t'.repeat(256));
      expect(castMember.notification.hasErrors()).toBe(true);
      expect(castMember.notification).notificationContainsErrorMessages([
        {
          name: ['name must be shorter than or equal to 255 characters'],
        },
      ]);
    });
  });
});