
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model TicketMessage
 * 
 */
export type TicketMessage = $Result.DefaultSelection<Prisma.$TicketMessagePayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model Voucher
 * 
 */
export type Voucher = $Result.DefaultSelection<Prisma.$VoucherPayload>
/**
 * Model ClaimedVoucher
 * 
 */
export type ClaimedVoucher = $Result.DefaultSelection<Prisma.$ClaimedVoucherPayload>
/**
 * Model ChatLog
 * 
 */
export type ChatLog = $Result.DefaultSelection<Prisma.$ChatLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  CUSTOMER: 'CUSTOMER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TicketStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const TicketPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority]


export const TicketChannel: {
  WHATSAPP: 'WHATSAPP',
  EMAIL: 'EMAIL',
  FORM: 'FORM',
  CHAT: 'CHAT'
};

export type TicketChannel = (typeof TicketChannel)[keyof typeof TicketChannel]


export const CustomerSegment: {
  VIP: 'VIP',
  AKTIF: 'AKTIF',
  PROSPEK: 'PROSPEK',
  TIDAK_AKTIF: 'TIDAK_AKTIF'
};

export type CustomerSegment = (typeof CustomerSegment)[keyof typeof CustomerSegment]


export const NotificationType: {
  TICKET: 'TICKET',
  VOUCHER: 'VOUCHER',
  SYSTEM: 'SYSTEM'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type TicketPriority = $Enums.TicketPriority

export const TicketPriority: typeof $Enums.TicketPriority

export type TicketChannel = $Enums.TicketChannel

export const TicketChannel: typeof $Enums.TicketChannel

export type CustomerSegment = $Enums.CustomerSegment

export const CustomerSegment: typeof $Enums.CustomerSegment

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticketMessage`: Exposes CRUD operations for the **TicketMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketMessages
    * const ticketMessages = await prisma.ticketMessage.findMany()
    * ```
    */
  get ticketMessage(): Prisma.TicketMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voucher`: Exposes CRUD operations for the **Voucher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vouchers
    * const vouchers = await prisma.voucher.findMany()
    * ```
    */
  get voucher(): Prisma.VoucherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.claimedVoucher`: Exposes CRUD operations for the **ClaimedVoucher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClaimedVouchers
    * const claimedVouchers = await prisma.claimedVoucher.findMany()
    * ```
    */
  get claimedVoucher(): Prisma.ClaimedVoucherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatLog`: Exposes CRUD operations for the **ChatLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatLogs
    * const chatLogs = await prisma.chatLog.findMany()
    * ```
    */
  get chatLog(): Prisma.ChatLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Customer: 'Customer',
    Ticket: 'Ticket',
    TicketMessage: 'TicketMessage',
    Feedback: 'Feedback',
    Voucher: 'Voucher',
    ClaimedVoucher: 'ClaimedVoucher',
    ChatLog: 'ChatLog',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "customer" | "ticket" | "ticketMessage" | "feedback" | "voucher" | "claimedVoucher" | "chatLog" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      TicketMessage: {
        payload: Prisma.$TicketMessagePayload<ExtArgs>
        fields: Prisma.TicketMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          findFirst: {
            args: Prisma.TicketMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          findMany: {
            args: Prisma.TicketMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          create: {
            args: Prisma.TicketMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          createMany: {
            args: Prisma.TicketMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          delete: {
            args: Prisma.TicketMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          update: {
            args: Prisma.TicketMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          deleteMany: {
            args: Prisma.TicketMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>[]
          }
          upsert: {
            args: Prisma.TicketMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketMessagePayload>
          }
          aggregate: {
            args: Prisma.TicketMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicketMessage>
          }
          groupBy: {
            args: Prisma.TicketMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketMessageCountArgs<ExtArgs>
            result: $Utils.Optional<TicketMessageCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      Voucher: {
        payload: Prisma.$VoucherPayload<ExtArgs>
        fields: Prisma.VoucherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoucherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoucherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findFirst: {
            args: Prisma.VoucherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoucherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          findMany: {
            args: Prisma.VoucherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          create: {
            args: Prisma.VoucherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          createMany: {
            args: Prisma.VoucherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoucherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          delete: {
            args: Prisma.VoucherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          update: {
            args: Prisma.VoucherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          deleteMany: {
            args: Prisma.VoucherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoucherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoucherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>[]
          }
          upsert: {
            args: Prisma.VoucherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VoucherPayload>
          }
          aggregate: {
            args: Prisma.VoucherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoucher>
          }
          groupBy: {
            args: Prisma.VoucherGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoucherGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoucherCountArgs<ExtArgs>
            result: $Utils.Optional<VoucherCountAggregateOutputType> | number
          }
        }
      }
      ClaimedVoucher: {
        payload: Prisma.$ClaimedVoucherPayload<ExtArgs>
        fields: Prisma.ClaimedVoucherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimedVoucherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimedVoucherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          findFirst: {
            args: Prisma.ClaimedVoucherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimedVoucherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          findMany: {
            args: Prisma.ClaimedVoucherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>[]
          }
          create: {
            args: Prisma.ClaimedVoucherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          createMany: {
            args: Prisma.ClaimedVoucherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimedVoucherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>[]
          }
          delete: {
            args: Prisma.ClaimedVoucherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          update: {
            args: Prisma.ClaimedVoucherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          deleteMany: {
            args: Prisma.ClaimedVoucherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimedVoucherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClaimedVoucherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>[]
          }
          upsert: {
            args: Prisma.ClaimedVoucherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimedVoucherPayload>
          }
          aggregate: {
            args: Prisma.ClaimedVoucherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaimedVoucher>
          }
          groupBy: {
            args: Prisma.ClaimedVoucherGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimedVoucherGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimedVoucherCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimedVoucherCountAggregateOutputType> | number
          }
        }
      }
      ChatLog: {
        payload: Prisma.$ChatLogPayload<ExtArgs>
        fields: Prisma.ChatLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          findFirst: {
            args: Prisma.ChatLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          findMany: {
            args: Prisma.ChatLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          create: {
            args: Prisma.ChatLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          createMany: {
            args: Prisma.ChatLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          delete: {
            args: Prisma.ChatLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          update: {
            args: Prisma.ChatLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          deleteMany: {
            args: Prisma.ChatLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>[]
          }
          upsert: {
            args: Prisma.ChatLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatLogPayload>
          }
          aggregate: {
            args: Prisma.ChatLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatLog>
          }
          groupBy: {
            args: Prisma.ChatLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatLogCountArgs<ExtArgs>
            result: $Utils.Optional<ChatLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    customer?: CustomerOmit
    ticket?: TicketOmit
    ticketMessage?: TicketMessageOmit
    feedback?: FeedbackOmit
    voucher?: VoucherOmit
    claimedVoucher?: ClaimedVoucherOmit
    chatLog?: ChatLogOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assignedTickets: number
    sentMessages: number
    feedbacks: number
    claimedVouchers: number
    chatLogs: number
    notifications: number
    tickets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedTickets?: boolean | UserCountOutputTypeCountAssignedTicketsArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    feedbacks?: boolean | UserCountOutputTypeCountFeedbacksArgs
    claimedVouchers?: boolean | UserCountOutputTypeCountClaimedVouchersArgs
    chatLogs?: boolean | UserCountOutputTypeCountChatLogsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    tickets?: boolean | UserCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimedVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimedVoucherWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type TicketCountOutputType
   */

  export type TicketCountOutputType = {
    messages: number
    chatLogs: number
  }

  export type TicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | TicketCountOutputTypeCountMessagesArgs
    chatLogs?: boolean | TicketCountOutputTypeCountChatLogsArgs
  }

  // Custom InputTypes
  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketCountOutputType
     */
    select?: TicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
  }

  /**
   * TicketCountOutputType without action
   */
  export type TicketCountOutputTypeCountChatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
  }


  /**
   * Count Type VoucherCountOutputType
   */

  export type VoucherCountOutputType = {
    claimedVouchers: number
  }

  export type VoucherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimedVouchers?: boolean | VoucherCountOutputTypeCountClaimedVouchersArgs
  }

  // Custom InputTypes
  /**
   * VoucherCountOutputType without action
   */
  export type VoucherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VoucherCountOutputType
     */
    select?: VoucherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VoucherCountOutputType without action
   */
  export type VoucherCountOutputTypeCountClaimedVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimedVoucherWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    role: $Enums.Role
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | User$customerArgs<ExtArgs>
    assignedTickets?: boolean | User$assignedTicketsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    claimedVouchers?: boolean | User$claimedVouchersArgs<ExtArgs>
    chatLogs?: boolean | User$chatLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | User$customerArgs<ExtArgs>
    assignedTickets?: boolean | User$assignedTicketsArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    claimedVouchers?: boolean | User$claimedVouchersArgs<ExtArgs>
    chatLogs?: boolean | User$chatLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    tickets?: boolean | User$ticketsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      assignedTickets: Prisma.$TicketPayload<ExtArgs>[]
      sentMessages: Prisma.$TicketMessagePayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
      claimedVouchers: Prisma.$ClaimedVoucherPayload<ExtArgs>[]
      chatLogs: Prisma.$ChatLogPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      role: $Enums.Role
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends User$customerArgs<ExtArgs> = {}>(args?: Subset<T, User$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assignedTickets<T extends User$assignedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacks<T extends User$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claimedVouchers<T extends User$claimedVouchersArgs<ExtArgs> = {}>(args?: Subset<T, User$claimedVouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatLogs<T extends User$chatLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$chatLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tickets<T extends User$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, User$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.customer
   */
  export type User$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * User.assignedTickets
   */
  export type User$assignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    cursor?: TicketMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * User.feedbacks
   */
  export type User$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.claimedVouchers
   */
  export type User$claimedVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    where?: ClaimedVoucherWhereInput
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    cursor?: ClaimedVoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimedVoucherScalarFieldEnum | ClaimedVoucherScalarFieldEnum[]
  }

  /**
   * User.chatLogs
   */
  export type User$chatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    cursor?: ChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.tickets
   */
  export type User$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    address: string | null
    company: string | null
    segment: $Enums.CustomerSegment | null
    source: string | null
    createdAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    address: string | null
    company: string | null
    segment: $Enums.CustomerSegment | null
    source: string | null
    createdAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    userId: number
    phone: number
    address: number
    company: number
    segment: number
    source: number
    createdAt: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    company?: true
    segment?: true
    source?: true
    createdAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    company?: true
    segment?: true
    source?: true
    createdAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    company?: true
    segment?: true
    source?: true
    createdAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: number
    userId: number
    phone: string | null
    address: string | null
    company: string | null
    segment: $Enums.CustomerSegment
    source: string | null
    createdAt: Date
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    company?: boolean
    segment?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    company?: boolean
    segment?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    company?: boolean
    segment?: boolean
    source?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    company?: boolean
    segment?: boolean
    source?: boolean
    createdAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "phone" | "address" | "company" | "segment" | "source" | "createdAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      phone: string | null
      address: string | null
      company: string | null
      segment: $Enums.CustomerSegment
      source: string | null
      createdAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'Int'>
    readonly userId: FieldRef<"Customer", 'Int'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly address: FieldRef<"Customer", 'String'>
    readonly company: FieldRef<"Customer", 'String'>
    readonly segment: FieldRef<"Customer", 'CustomerSegment'>
    readonly source: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    id: number | null
    customerId: number | null
    assignedTo: number | null
  }

  export type TicketSumAggregateOutputType = {
    id: number | null
    customerId: number | null
    assignedTo: number | null
  }

  export type TicketMinAggregateOutputType = {
    id: number | null
    ticketNumber: string | null
    title: string | null
    description: string | null
    status: $Enums.TicketStatus | null
    priority: $Enums.TicketPriority | null
    channel: $Enums.TicketChannel | null
    customerId: number | null
    assignedTo: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
  }

  export type TicketMaxAggregateOutputType = {
    id: number | null
    ticketNumber: string | null
    title: string | null
    description: string | null
    status: $Enums.TicketStatus | null
    priority: $Enums.TicketPriority | null
    channel: $Enums.TicketChannel | null
    customerId: number | null
    assignedTo: number | null
    createdAt: Date | null
    updatedAt: Date | null
    resolvedAt: Date | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    ticketNumber: number
    title: number
    description: number
    status: number
    priority: number
    channel: number
    customerId: number
    assignedTo: number
    createdAt: number
    updatedAt: number
    resolvedAt: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    id?: true
    customerId?: true
    assignedTo?: true
  }

  export type TicketSumAggregateInputType = {
    id?: true
    customerId?: true
    assignedTo?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    ticketNumber?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    channel?: true
    customerId?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    ticketNumber?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    channel?: true
    customerId?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    ticketNumber?: true
    title?: true
    description?: true
    status?: true
    priority?: true
    channel?: true
    customerId?: true
    assignedTo?: true
    createdAt?: true
    updatedAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: number
    ticketNumber: string
    title: string
    description: string
    status: $Enums.TicketStatus
    priority: $Enums.TicketPriority
    channel: $Enums.TicketChannel
    customerId: number
    assignedTo: number | null
    createdAt: Date
    updatedAt: Date
    resolvedAt: Date | null
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    channel?: boolean
    customerId?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
    messages?: boolean | Ticket$messagesArgs<ExtArgs>
    feedback?: boolean | Ticket$feedbackArgs<ExtArgs>
    chatLogs?: boolean | Ticket$chatLogsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    channel?: boolean
    customerId?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketNumber?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    channel?: boolean
    customerId?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    ticketNumber?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    channel?: boolean
    customerId?: boolean
    assignedTo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resolvedAt?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketNumber" | "title" | "description" | "status" | "priority" | "channel" | "customerId" | "assignedTo" | "createdAt" | "updatedAt" | "resolvedAt", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
    messages?: boolean | Ticket$messagesArgs<ExtArgs>
    feedback?: boolean | Ticket$feedbackArgs<ExtArgs>
    chatLogs?: boolean | Ticket$chatLogsArgs<ExtArgs>
    _count?: boolean | TicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | UserDefaultArgs<ExtArgs>
    agent?: boolean | Ticket$agentArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      customer: Prisma.$UserPayload<ExtArgs>
      agent: Prisma.$UserPayload<ExtArgs> | null
      messages: Prisma.$TicketMessagePayload<ExtArgs>[]
      feedback: Prisma.$FeedbackPayload<ExtArgs> | null
      chatLogs: Prisma.$ChatLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ticketNumber: string
      title: string
      description: string
      status: $Enums.TicketStatus
      priority: $Enums.TicketPriority
      channel: $Enums.TicketChannel
      customerId: number
      assignedTo: number | null
      createdAt: Date
      updatedAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    agent<T extends Ticket$agentArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$agentArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Ticket$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedback<T extends Ticket$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$feedbackArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    chatLogs<T extends Ticket$chatLogsArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$chatLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'Int'>
    readonly ticketNumber: FieldRef<"Ticket", 'String'>
    readonly title: FieldRef<"Ticket", 'String'>
    readonly description: FieldRef<"Ticket", 'String'>
    readonly status: FieldRef<"Ticket", 'TicketStatus'>
    readonly priority: FieldRef<"Ticket", 'TicketPriority'>
    readonly channel: FieldRef<"Ticket", 'TicketChannel'>
    readonly customerId: FieldRef<"Ticket", 'Int'>
    readonly assignedTo: FieldRef<"Ticket", 'Int'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
    readonly resolvedAt: FieldRef<"Ticket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.agent
   */
  export type Ticket$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Ticket.messages
   */
  export type Ticket$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    cursor?: TicketMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * Ticket.feedback
   */
  export type Ticket$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
  }

  /**
   * Ticket.chatLogs
   */
  export type Ticket$chatLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    cursor?: ChatLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model TicketMessage
   */

  export type AggregateTicketMessage = {
    _count: TicketMessageCountAggregateOutputType | null
    _avg: TicketMessageAvgAggregateOutputType | null
    _sum: TicketMessageSumAggregateOutputType | null
    _min: TicketMessageMinAggregateOutputType | null
    _max: TicketMessageMaxAggregateOutputType | null
  }

  export type TicketMessageAvgAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
  }

  export type TicketMessageSumAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
  }

  export type TicketMessageMinAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
    senderRole: string | null
    message: string | null
    isInternal: boolean | null
    createdAt: Date | null
  }

  export type TicketMessageMaxAggregateOutputType = {
    id: number | null
    ticketId: number | null
    senderId: number | null
    senderRole: string | null
    message: string | null
    isInternal: boolean | null
    createdAt: Date | null
  }

  export type TicketMessageCountAggregateOutputType = {
    id: number
    ticketId: number
    senderId: number
    senderRole: number
    message: number
    isInternal: number
    createdAt: number
    _all: number
  }


  export type TicketMessageAvgAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
  }

  export type TicketMessageSumAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
  }

  export type TicketMessageMinAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    senderRole?: true
    message?: true
    isInternal?: true
    createdAt?: true
  }

  export type TicketMessageMaxAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    senderRole?: true
    message?: true
    isInternal?: true
    createdAt?: true
  }

  export type TicketMessageCountAggregateInputType = {
    id?: true
    ticketId?: true
    senderId?: true
    senderRole?: true
    message?: true
    isInternal?: true
    createdAt?: true
    _all?: true
  }

  export type TicketMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketMessage to aggregate.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketMessages
    **/
    _count?: true | TicketMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMessageMaxAggregateInputType
  }

  export type GetTicketMessageAggregateType<T extends TicketMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketMessage[P]>
      : GetScalarType<T[P], AggregateTicketMessage[P]>
  }




  export type TicketMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketMessageWhereInput
    orderBy?: TicketMessageOrderByWithAggregationInput | TicketMessageOrderByWithAggregationInput[]
    by: TicketMessageScalarFieldEnum[] | TicketMessageScalarFieldEnum
    having?: TicketMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketMessageCountAggregateInputType | true
    _avg?: TicketMessageAvgAggregateInputType
    _sum?: TicketMessageSumAggregateInputType
    _min?: TicketMessageMinAggregateInputType
    _max?: TicketMessageMaxAggregateInputType
  }

  export type TicketMessageGroupByOutputType = {
    id: number
    ticketId: number
    senderId: number
    senderRole: string
    message: string
    isInternal: boolean
    createdAt: Date
    _count: TicketMessageCountAggregateOutputType | null
    _avg: TicketMessageAvgAggregateOutputType | null
    _sum: TicketMessageSumAggregateOutputType | null
    _min: TicketMessageMinAggregateOutputType | null
    _max: TicketMessageMaxAggregateOutputType | null
  }

  type GetTicketMessageGroupByPayload<T extends TicketMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketMessageGroupByOutputType[P]>
            : GetScalarType<T[P], TicketMessageGroupByOutputType[P]>
        }
      >
    >


  export type TicketMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    senderRole?: boolean
    message?: boolean
    isInternal?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    senderRole?: boolean
    message?: boolean
    isInternal?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    senderRole?: boolean
    message?: boolean
    isInternal?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketMessage"]>

  export type TicketMessageSelectScalar = {
    id?: boolean
    ticketId?: boolean
    senderId?: boolean
    senderRole?: boolean
    message?: boolean
    isInternal?: boolean
    createdAt?: boolean
  }

  export type TicketMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketId" | "senderId" | "senderRole" | "message" | "isInternal" | "createdAt", ExtArgs["result"]["ticketMessage"]>
  export type TicketMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TicketMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketMessage"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ticketId: number
      senderId: number
      senderRole: string
      message: string
      isInternal: boolean
      createdAt: Date
    }, ExtArgs["result"]["ticketMessage"]>
    composites: {}
  }

  type TicketMessageGetPayload<S extends boolean | null | undefined | TicketMessageDefaultArgs> = $Result.GetResult<Prisma.$TicketMessagePayload, S>

  type TicketMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketMessageCountAggregateInputType | true
    }

  export interface TicketMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketMessage'], meta: { name: 'TicketMessage' } }
    /**
     * Find zero or one TicketMessage that matches the filter.
     * @param {TicketMessageFindUniqueArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketMessageFindUniqueArgs>(args: SelectSubset<T, TicketMessageFindUniqueArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TicketMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketMessageFindUniqueOrThrowArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindFirstArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketMessageFindFirstArgs>(args?: SelectSubset<T, TicketMessageFindFirstArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindFirstOrThrowArgs} args - Arguments to find a TicketMessage
     * @example
     * // Get one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TicketMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketMessages
     * const ticketMessages = await prisma.ticketMessage.findMany()
     * 
     * // Get first 10 TicketMessages
     * const ticketMessages = await prisma.ticketMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketMessageFindManyArgs>(args?: SelectSubset<T, TicketMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TicketMessage.
     * @param {TicketMessageCreateArgs} args - Arguments to create a TicketMessage.
     * @example
     * // Create one TicketMessage
     * const TicketMessage = await prisma.ticketMessage.create({
     *   data: {
     *     // ... data to create a TicketMessage
     *   }
     * })
     * 
     */
    create<T extends TicketMessageCreateArgs>(args: SelectSubset<T, TicketMessageCreateArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TicketMessages.
     * @param {TicketMessageCreateManyArgs} args - Arguments to create many TicketMessages.
     * @example
     * // Create many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketMessageCreateManyArgs>(args?: SelectSubset<T, TicketMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TicketMessages and returns the data saved in the database.
     * @param {TicketMessageCreateManyAndReturnArgs} args - Arguments to create many TicketMessages.
     * @example
     * // Create many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TicketMessages and only return the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TicketMessage.
     * @param {TicketMessageDeleteArgs} args - Arguments to delete one TicketMessage.
     * @example
     * // Delete one TicketMessage
     * const TicketMessage = await prisma.ticketMessage.delete({
     *   where: {
     *     // ... filter to delete one TicketMessage
     *   }
     * })
     * 
     */
    delete<T extends TicketMessageDeleteArgs>(args: SelectSubset<T, TicketMessageDeleteArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TicketMessage.
     * @param {TicketMessageUpdateArgs} args - Arguments to update one TicketMessage.
     * @example
     * // Update one TicketMessage
     * const ticketMessage = await prisma.ticketMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketMessageUpdateArgs>(args: SelectSubset<T, TicketMessageUpdateArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TicketMessages.
     * @param {TicketMessageDeleteManyArgs} args - Arguments to filter TicketMessages to delete.
     * @example
     * // Delete a few TicketMessages
     * const { count } = await prisma.ticketMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketMessageDeleteManyArgs>(args?: SelectSubset<T, TicketMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketMessageUpdateManyArgs>(args: SelectSubset<T, TicketMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketMessages and returns the data updated in the database.
     * @param {TicketMessageUpdateManyAndReturnArgs} args - Arguments to update many TicketMessages.
     * @example
     * // Update many TicketMessages
     * const ticketMessage = await prisma.ticketMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TicketMessages and only return the `id`
     * const ticketMessageWithIdOnly = await prisma.ticketMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TicketMessage.
     * @param {TicketMessageUpsertArgs} args - Arguments to update or create a TicketMessage.
     * @example
     * // Update or create a TicketMessage
     * const ticketMessage = await prisma.ticketMessage.upsert({
     *   create: {
     *     // ... data to create a TicketMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketMessage we want to update
     *   }
     * })
     */
    upsert<T extends TicketMessageUpsertArgs>(args: SelectSubset<T, TicketMessageUpsertArgs<ExtArgs>>): Prisma__TicketMessageClient<$Result.GetResult<Prisma.$TicketMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TicketMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageCountArgs} args - Arguments to filter TicketMessages to count.
     * @example
     * // Count the number of TicketMessages
     * const count = await prisma.ticketMessage.count({
     *   where: {
     *     // ... the filter for the TicketMessages we want to count
     *   }
     * })
    **/
    count<T extends TicketMessageCountArgs>(
      args?: Subset<T, TicketMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketMessageAggregateArgs>(args: Subset<T, TicketMessageAggregateArgs>): Prisma.PrismaPromise<GetTicketMessageAggregateType<T>>

    /**
     * Group by TicketMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketMessageGroupByArgs['orderBy'] }
        : { orderBy?: TicketMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketMessage model
   */
  readonly fields: TicketMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TicketMessage model
   */
  interface TicketMessageFieldRefs {
    readonly id: FieldRef<"TicketMessage", 'Int'>
    readonly ticketId: FieldRef<"TicketMessage", 'Int'>
    readonly senderId: FieldRef<"TicketMessage", 'Int'>
    readonly senderRole: FieldRef<"TicketMessage", 'String'>
    readonly message: FieldRef<"TicketMessage", 'String'>
    readonly isInternal: FieldRef<"TicketMessage", 'Boolean'>
    readonly createdAt: FieldRef<"TicketMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TicketMessage findUnique
   */
  export type TicketMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage findUniqueOrThrow
   */
  export type TicketMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage findFirst
   */
  export type TicketMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketMessages.
     */
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage findFirstOrThrow
   */
  export type TicketMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessage to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketMessages.
     */
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage findMany
   */
  export type TicketMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter, which TicketMessages to fetch.
     */
    where?: TicketMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketMessages to fetch.
     */
    orderBy?: TicketMessageOrderByWithRelationInput | TicketMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketMessages.
     */
    cursor?: TicketMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketMessages.
     */
    distinct?: TicketMessageScalarFieldEnum | TicketMessageScalarFieldEnum[]
  }

  /**
   * TicketMessage create
   */
  export type TicketMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketMessage.
     */
    data: XOR<TicketMessageCreateInput, TicketMessageUncheckedCreateInput>
  }

  /**
   * TicketMessage createMany
   */
  export type TicketMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketMessages.
     */
    data: TicketMessageCreateManyInput | TicketMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketMessage createManyAndReturn
   */
  export type TicketMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * The data used to create many TicketMessages.
     */
    data: TicketMessageCreateManyInput | TicketMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketMessage update
   */
  export type TicketMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketMessage.
     */
    data: XOR<TicketMessageUpdateInput, TicketMessageUncheckedUpdateInput>
    /**
     * Choose, which TicketMessage to update.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage updateMany
   */
  export type TicketMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketMessages.
     */
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyInput>
    /**
     * Filter which TicketMessages to update
     */
    where?: TicketMessageWhereInput
    /**
     * Limit how many TicketMessages to update.
     */
    limit?: number
  }

  /**
   * TicketMessage updateManyAndReturn
   */
  export type TicketMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * The data used to update TicketMessages.
     */
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyInput>
    /**
     * Filter which TicketMessages to update
     */
    where?: TicketMessageWhereInput
    /**
     * Limit how many TicketMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TicketMessage upsert
   */
  export type TicketMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketMessage to update in case it exists.
     */
    where: TicketMessageWhereUniqueInput
    /**
     * In case the TicketMessage found by the `where` argument doesn't exist, create a new TicketMessage with this data.
     */
    create: XOR<TicketMessageCreateInput, TicketMessageUncheckedCreateInput>
    /**
     * In case the TicketMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketMessageUpdateInput, TicketMessageUncheckedUpdateInput>
  }

  /**
   * TicketMessage delete
   */
  export type TicketMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
    /**
     * Filter which TicketMessage to delete.
     */
    where: TicketMessageWhereUniqueInput
  }

  /**
   * TicketMessage deleteMany
   */
  export type TicketMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketMessages to delete
     */
    where?: TicketMessageWhereInput
    /**
     * Limit how many TicketMessages to delete.
     */
    limit?: number
  }

  /**
   * TicketMessage without action
   */
  export type TicketMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketMessage
     */
    select?: TicketMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketMessage
     */
    omit?: TicketMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketMessageInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    id: number | null
    ticketId: number | null
    customerId: number | null
    rating: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    id: number | null
    ticketId: number | null
    customerId: number | null
    rating: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: number | null
    ticketId: number | null
    customerId: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: number | null
    ticketId: number | null
    customerId: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    ticketId: number
    customerId: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    id?: true
    ticketId?: true
    customerId?: true
    rating?: true
  }

  export type FeedbackSumAggregateInputType = {
    id?: true
    ticketId?: true
    customerId?: true
    rating?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    ticketId?: true
    customerId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    ticketId?: true
    customerId?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    ticketId?: true
    customerId?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: number
    ticketId: number
    customerId: number
    rating: number
    comment: string | null
    createdAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    customerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    customerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ticketId?: boolean
    customerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    ticketId?: boolean
    customerId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ticketId" | "customerId" | "rating" | "comment" | "createdAt", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
      customer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      ticketId: number
      customerId: number
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'Int'>
    readonly ticketId: FieldRef<"Feedback", 'Int'>
    readonly customerId: FieldRef<"Feedback", 'Int'>
    readonly rating: FieldRef<"Feedback", 'Int'>
    readonly comment: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model Voucher
   */

  export type AggregateVoucher = {
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  export type VoucherAvgAggregateOutputType = {
    id: number | null
    discount: number | null
  }

  export type VoucherSumAggregateOutputType = {
    id: number | null
    discount: number | null
  }

  export type VoucherMinAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
    description: string | null
    discount: number | null
    validUntil: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type VoucherMaxAggregateOutputType = {
    id: number | null
    code: string | null
    title: string | null
    description: string | null
    discount: number | null
    validUntil: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type VoucherCountAggregateOutputType = {
    id: number
    code: number
    title: number
    description: number
    discount: number
    validUntil: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type VoucherAvgAggregateInputType = {
    id?: true
    discount?: true
  }

  export type VoucherSumAggregateInputType = {
    id?: true
    discount?: true
  }

  export type VoucherMinAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    discount?: true
    validUntil?: true
    isActive?: true
    createdAt?: true
  }

  export type VoucherMaxAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    discount?: true
    validUntil?: true
    isActive?: true
    createdAt?: true
  }

  export type VoucherCountAggregateInputType = {
    id?: true
    code?: true
    title?: true
    description?: true
    discount?: true
    validUntil?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type VoucherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Voucher to aggregate.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vouchers
    **/
    _count?: true | VoucherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoucherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoucherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoucherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoucherMaxAggregateInputType
  }

  export type GetVoucherAggregateType<T extends VoucherAggregateArgs> = {
        [P in keyof T & keyof AggregateVoucher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoucher[P]>
      : GetScalarType<T[P], AggregateVoucher[P]>
  }




  export type VoucherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoucherWhereInput
    orderBy?: VoucherOrderByWithAggregationInput | VoucherOrderByWithAggregationInput[]
    by: VoucherScalarFieldEnum[] | VoucherScalarFieldEnum
    having?: VoucherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoucherCountAggregateInputType | true
    _avg?: VoucherAvgAggregateInputType
    _sum?: VoucherSumAggregateInputType
    _min?: VoucherMinAggregateInputType
    _max?: VoucherMaxAggregateInputType
  }

  export type VoucherGroupByOutputType = {
    id: number
    code: string
    title: string
    description: string | null
    discount: number
    validUntil: Date
    isActive: boolean
    createdAt: Date
    _count: VoucherCountAggregateOutputType | null
    _avg: VoucherAvgAggregateOutputType | null
    _sum: VoucherSumAggregateOutputType | null
    _min: VoucherMinAggregateOutputType | null
    _max: VoucherMaxAggregateOutputType | null
  }

  type GetVoucherGroupByPayload<T extends VoucherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoucherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoucherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoucherGroupByOutputType[P]>
            : GetScalarType<T[P], VoucherGroupByOutputType[P]>
        }
      >
    >


  export type VoucherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    discount?: boolean
    validUntil?: boolean
    isActive?: boolean
    createdAt?: boolean
    claimedVouchers?: boolean | Voucher$claimedVouchersArgs<ExtArgs>
    _count?: boolean | VoucherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    discount?: boolean
    validUntil?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    discount?: boolean
    validUntil?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["voucher"]>

  export type VoucherSelectScalar = {
    id?: boolean
    code?: boolean
    title?: boolean
    description?: boolean
    discount?: boolean
    validUntil?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type VoucherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "title" | "description" | "discount" | "validUntil" | "isActive" | "createdAt", ExtArgs["result"]["voucher"]>
  export type VoucherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claimedVouchers?: boolean | Voucher$claimedVouchersArgs<ExtArgs>
    _count?: boolean | VoucherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VoucherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VoucherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VoucherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Voucher"
    objects: {
      claimedVouchers: Prisma.$ClaimedVoucherPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      title: string
      description: string | null
      discount: number
      validUntil: Date
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["voucher"]>
    composites: {}
  }

  type VoucherGetPayload<S extends boolean | null | undefined | VoucherDefaultArgs> = $Result.GetResult<Prisma.$VoucherPayload, S>

  type VoucherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoucherCountAggregateInputType | true
    }

  export interface VoucherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Voucher'], meta: { name: 'Voucher' } }
    /**
     * Find zero or one Voucher that matches the filter.
     * @param {VoucherFindUniqueArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoucherFindUniqueArgs>(args: SelectSubset<T, VoucherFindUniqueArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Voucher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoucherFindUniqueOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoucherFindUniqueOrThrowArgs>(args: SelectSubset<T, VoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voucher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoucherFindFirstArgs>(args?: SelectSubset<T, VoucherFindFirstArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voucher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindFirstOrThrowArgs} args - Arguments to find a Voucher
     * @example
     * // Get one Voucher
     * const voucher = await prisma.voucher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoucherFindFirstOrThrowArgs>(args?: SelectSubset<T, VoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vouchers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vouchers
     * const vouchers = await prisma.voucher.findMany()
     * 
     * // Get first 10 Vouchers
     * const vouchers = await prisma.voucher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voucherWithIdOnly = await prisma.voucher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoucherFindManyArgs>(args?: SelectSubset<T, VoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Voucher.
     * @param {VoucherCreateArgs} args - Arguments to create a Voucher.
     * @example
     * // Create one Voucher
     * const Voucher = await prisma.voucher.create({
     *   data: {
     *     // ... data to create a Voucher
     *   }
     * })
     * 
     */
    create<T extends VoucherCreateArgs>(args: SelectSubset<T, VoucherCreateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vouchers.
     * @param {VoucherCreateManyArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoucherCreateManyArgs>(args?: SelectSubset<T, VoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vouchers and returns the data saved in the database.
     * @param {VoucherCreateManyAndReturnArgs} args - Arguments to create many Vouchers.
     * @example
     * // Create many Vouchers
     * const voucher = await prisma.voucher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vouchers and only return the `id`
     * const voucherWithIdOnly = await prisma.voucher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoucherCreateManyAndReturnArgs>(args?: SelectSubset<T, VoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Voucher.
     * @param {VoucherDeleteArgs} args - Arguments to delete one Voucher.
     * @example
     * // Delete one Voucher
     * const Voucher = await prisma.voucher.delete({
     *   where: {
     *     // ... filter to delete one Voucher
     *   }
     * })
     * 
     */
    delete<T extends VoucherDeleteArgs>(args: SelectSubset<T, VoucherDeleteArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Voucher.
     * @param {VoucherUpdateArgs} args - Arguments to update one Voucher.
     * @example
     * // Update one Voucher
     * const voucher = await prisma.voucher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoucherUpdateArgs>(args: SelectSubset<T, VoucherUpdateArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vouchers.
     * @param {VoucherDeleteManyArgs} args - Arguments to filter Vouchers to delete.
     * @example
     * // Delete a few Vouchers
     * const { count } = await prisma.voucher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoucherDeleteManyArgs>(args?: SelectSubset<T, VoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vouchers
     * const voucher = await prisma.voucher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoucherUpdateManyArgs>(args: SelectSubset<T, VoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vouchers and returns the data updated in the database.
     * @param {VoucherUpdateManyAndReturnArgs} args - Arguments to update many Vouchers.
     * @example
     * // Update many Vouchers
     * const voucher = await prisma.voucher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vouchers and only return the `id`
     * const voucherWithIdOnly = await prisma.voucher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoucherUpdateManyAndReturnArgs>(args: SelectSubset<T, VoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Voucher.
     * @param {VoucherUpsertArgs} args - Arguments to update or create a Voucher.
     * @example
     * // Update or create a Voucher
     * const voucher = await prisma.voucher.upsert({
     *   create: {
     *     // ... data to create a Voucher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voucher we want to update
     *   }
     * })
     */
    upsert<T extends VoucherUpsertArgs>(args: SelectSubset<T, VoucherUpsertArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherCountArgs} args - Arguments to filter Vouchers to count.
     * @example
     * // Count the number of Vouchers
     * const count = await prisma.voucher.count({
     *   where: {
     *     // ... the filter for the Vouchers we want to count
     *   }
     * })
    **/
    count<T extends VoucherCountArgs>(
      args?: Subset<T, VoucherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoucherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoucherAggregateArgs>(args: Subset<T, VoucherAggregateArgs>): Prisma.PrismaPromise<GetVoucherAggregateType<T>>

    /**
     * Group by Voucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoucherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoucherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoucherGroupByArgs['orderBy'] }
        : { orderBy?: VoucherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Voucher model
   */
  readonly fields: VoucherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Voucher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoucherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claimedVouchers<T extends Voucher$claimedVouchersArgs<ExtArgs> = {}>(args?: Subset<T, Voucher$claimedVouchersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Voucher model
   */
  interface VoucherFieldRefs {
    readonly id: FieldRef<"Voucher", 'Int'>
    readonly code: FieldRef<"Voucher", 'String'>
    readonly title: FieldRef<"Voucher", 'String'>
    readonly description: FieldRef<"Voucher", 'String'>
    readonly discount: FieldRef<"Voucher", 'Int'>
    readonly validUntil: FieldRef<"Voucher", 'DateTime'>
    readonly isActive: FieldRef<"Voucher", 'Boolean'>
    readonly createdAt: FieldRef<"Voucher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Voucher findUnique
   */
  export type VoucherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findUniqueOrThrow
   */
  export type VoucherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher findFirst
   */
  export type VoucherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findFirstOrThrow
   */
  export type VoucherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Voucher to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher findMany
   */
  export type VoucherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter, which Vouchers to fetch.
     */
    where?: VoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vouchers to fetch.
     */
    orderBy?: VoucherOrderByWithRelationInput | VoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vouchers.
     */
    cursor?: VoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vouchers.
     */
    distinct?: VoucherScalarFieldEnum | VoucherScalarFieldEnum[]
  }

  /**
   * Voucher create
   */
  export type VoucherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The data needed to create a Voucher.
     */
    data: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
  }

  /**
   * Voucher createMany
   */
  export type VoucherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Voucher createManyAndReturn
   */
  export type VoucherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data used to create many Vouchers.
     */
    data: VoucherCreateManyInput | VoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Voucher update
   */
  export type VoucherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The data needed to update a Voucher.
     */
    data: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
    /**
     * Choose, which Voucher to update.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher updateMany
   */
  export type VoucherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vouchers.
     */
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyInput>
    /**
     * Filter which Vouchers to update
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to update.
     */
    limit?: number
  }

  /**
   * Voucher updateManyAndReturn
   */
  export type VoucherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * The data used to update Vouchers.
     */
    data: XOR<VoucherUpdateManyMutationInput, VoucherUncheckedUpdateManyInput>
    /**
     * Filter which Vouchers to update
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to update.
     */
    limit?: number
  }

  /**
   * Voucher upsert
   */
  export type VoucherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * The filter to search for the Voucher to update in case it exists.
     */
    where: VoucherWhereUniqueInput
    /**
     * In case the Voucher found by the `where` argument doesn't exist, create a new Voucher with this data.
     */
    create: XOR<VoucherCreateInput, VoucherUncheckedCreateInput>
    /**
     * In case the Voucher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoucherUpdateInput, VoucherUncheckedUpdateInput>
  }

  /**
   * Voucher delete
   */
  export type VoucherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
    /**
     * Filter which Voucher to delete.
     */
    where: VoucherWhereUniqueInput
  }

  /**
   * Voucher deleteMany
   */
  export type VoucherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vouchers to delete
     */
    where?: VoucherWhereInput
    /**
     * Limit how many Vouchers to delete.
     */
    limit?: number
  }

  /**
   * Voucher.claimedVouchers
   */
  export type Voucher$claimedVouchersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    where?: ClaimedVoucherWhereInput
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    cursor?: ClaimedVoucherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimedVoucherScalarFieldEnum | ClaimedVoucherScalarFieldEnum[]
  }

  /**
   * Voucher without action
   */
  export type VoucherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Voucher
     */
    select?: VoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Voucher
     */
    omit?: VoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoucherInclude<ExtArgs> | null
  }


  /**
   * Model ClaimedVoucher
   */

  export type AggregateClaimedVoucher = {
    _count: ClaimedVoucherCountAggregateOutputType | null
    _avg: ClaimedVoucherAvgAggregateOutputType | null
    _sum: ClaimedVoucherSumAggregateOutputType | null
    _min: ClaimedVoucherMinAggregateOutputType | null
    _max: ClaimedVoucherMaxAggregateOutputType | null
  }

  export type ClaimedVoucherAvgAggregateOutputType = {
    id: number | null
    voucherId: number | null
    userId: number | null
  }

  export type ClaimedVoucherSumAggregateOutputType = {
    id: number | null
    voucherId: number | null
    userId: number | null
  }

  export type ClaimedVoucherMinAggregateOutputType = {
    id: number | null
    voucherId: number | null
    userId: number | null
    claimedAt: Date | null
  }

  export type ClaimedVoucherMaxAggregateOutputType = {
    id: number | null
    voucherId: number | null
    userId: number | null
    claimedAt: Date | null
  }

  export type ClaimedVoucherCountAggregateOutputType = {
    id: number
    voucherId: number
    userId: number
    claimedAt: number
    _all: number
  }


  export type ClaimedVoucherAvgAggregateInputType = {
    id?: true
    voucherId?: true
    userId?: true
  }

  export type ClaimedVoucherSumAggregateInputType = {
    id?: true
    voucherId?: true
    userId?: true
  }

  export type ClaimedVoucherMinAggregateInputType = {
    id?: true
    voucherId?: true
    userId?: true
    claimedAt?: true
  }

  export type ClaimedVoucherMaxAggregateInputType = {
    id?: true
    voucherId?: true
    userId?: true
    claimedAt?: true
  }

  export type ClaimedVoucherCountAggregateInputType = {
    id?: true
    voucherId?: true
    userId?: true
    claimedAt?: true
    _all?: true
  }

  export type ClaimedVoucherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimedVoucher to aggregate.
     */
    where?: ClaimedVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimedVouchers to fetch.
     */
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimedVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimedVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimedVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClaimedVouchers
    **/
    _count?: true | ClaimedVoucherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimedVoucherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimedVoucherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimedVoucherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimedVoucherMaxAggregateInputType
  }

  export type GetClaimedVoucherAggregateType<T extends ClaimedVoucherAggregateArgs> = {
        [P in keyof T & keyof AggregateClaimedVoucher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaimedVoucher[P]>
      : GetScalarType<T[P], AggregateClaimedVoucher[P]>
  }




  export type ClaimedVoucherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimedVoucherWhereInput
    orderBy?: ClaimedVoucherOrderByWithAggregationInput | ClaimedVoucherOrderByWithAggregationInput[]
    by: ClaimedVoucherScalarFieldEnum[] | ClaimedVoucherScalarFieldEnum
    having?: ClaimedVoucherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimedVoucherCountAggregateInputType | true
    _avg?: ClaimedVoucherAvgAggregateInputType
    _sum?: ClaimedVoucherSumAggregateInputType
    _min?: ClaimedVoucherMinAggregateInputType
    _max?: ClaimedVoucherMaxAggregateInputType
  }

  export type ClaimedVoucherGroupByOutputType = {
    id: number
    voucherId: number
    userId: number
    claimedAt: Date
    _count: ClaimedVoucherCountAggregateOutputType | null
    _avg: ClaimedVoucherAvgAggregateOutputType | null
    _sum: ClaimedVoucherSumAggregateOutputType | null
    _min: ClaimedVoucherMinAggregateOutputType | null
    _max: ClaimedVoucherMaxAggregateOutputType | null
  }

  type GetClaimedVoucherGroupByPayload<T extends ClaimedVoucherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimedVoucherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimedVoucherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimedVoucherGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimedVoucherGroupByOutputType[P]>
        }
      >
    >


  export type ClaimedVoucherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherId?: boolean
    userId?: boolean
    claimedAt?: boolean
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimedVoucher"]>

  export type ClaimedVoucherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherId?: boolean
    userId?: boolean
    claimedAt?: boolean
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimedVoucher"]>

  export type ClaimedVoucherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherId?: boolean
    userId?: boolean
    claimedAt?: boolean
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claimedVoucher"]>

  export type ClaimedVoucherSelectScalar = {
    id?: boolean
    voucherId?: boolean
    userId?: boolean
    claimedAt?: boolean
  }

  export type ClaimedVoucherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "voucherId" | "userId" | "claimedAt", ExtArgs["result"]["claimedVoucher"]>
  export type ClaimedVoucherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClaimedVoucherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClaimedVoucherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voucher?: boolean | VoucherDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClaimedVoucherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClaimedVoucher"
    objects: {
      voucher: Prisma.$VoucherPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      voucherId: number
      userId: number
      claimedAt: Date
    }, ExtArgs["result"]["claimedVoucher"]>
    composites: {}
  }

  type ClaimedVoucherGetPayload<S extends boolean | null | undefined | ClaimedVoucherDefaultArgs> = $Result.GetResult<Prisma.$ClaimedVoucherPayload, S>

  type ClaimedVoucherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClaimedVoucherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClaimedVoucherCountAggregateInputType | true
    }

  export interface ClaimedVoucherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClaimedVoucher'], meta: { name: 'ClaimedVoucher' } }
    /**
     * Find zero or one ClaimedVoucher that matches the filter.
     * @param {ClaimedVoucherFindUniqueArgs} args - Arguments to find a ClaimedVoucher
     * @example
     * // Get one ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimedVoucherFindUniqueArgs>(args: SelectSubset<T, ClaimedVoucherFindUniqueArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClaimedVoucher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClaimedVoucherFindUniqueOrThrowArgs} args - Arguments to find a ClaimedVoucher
     * @example
     * // Get one ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimedVoucherFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimedVoucherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimedVoucher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherFindFirstArgs} args - Arguments to find a ClaimedVoucher
     * @example
     * // Get one ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimedVoucherFindFirstArgs>(args?: SelectSubset<T, ClaimedVoucherFindFirstArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClaimedVoucher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherFindFirstOrThrowArgs} args - Arguments to find a ClaimedVoucher
     * @example
     * // Get one ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimedVoucherFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimedVoucherFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClaimedVouchers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClaimedVouchers
     * const claimedVouchers = await prisma.claimedVoucher.findMany()
     * 
     * // Get first 10 ClaimedVouchers
     * const claimedVouchers = await prisma.claimedVoucher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimedVoucherWithIdOnly = await prisma.claimedVoucher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimedVoucherFindManyArgs>(args?: SelectSubset<T, ClaimedVoucherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClaimedVoucher.
     * @param {ClaimedVoucherCreateArgs} args - Arguments to create a ClaimedVoucher.
     * @example
     * // Create one ClaimedVoucher
     * const ClaimedVoucher = await prisma.claimedVoucher.create({
     *   data: {
     *     // ... data to create a ClaimedVoucher
     *   }
     * })
     * 
     */
    create<T extends ClaimedVoucherCreateArgs>(args: SelectSubset<T, ClaimedVoucherCreateArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClaimedVouchers.
     * @param {ClaimedVoucherCreateManyArgs} args - Arguments to create many ClaimedVouchers.
     * @example
     * // Create many ClaimedVouchers
     * const claimedVoucher = await prisma.claimedVoucher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimedVoucherCreateManyArgs>(args?: SelectSubset<T, ClaimedVoucherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClaimedVouchers and returns the data saved in the database.
     * @param {ClaimedVoucherCreateManyAndReturnArgs} args - Arguments to create many ClaimedVouchers.
     * @example
     * // Create many ClaimedVouchers
     * const claimedVoucher = await prisma.claimedVoucher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClaimedVouchers and only return the `id`
     * const claimedVoucherWithIdOnly = await prisma.claimedVoucher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimedVoucherCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimedVoucherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClaimedVoucher.
     * @param {ClaimedVoucherDeleteArgs} args - Arguments to delete one ClaimedVoucher.
     * @example
     * // Delete one ClaimedVoucher
     * const ClaimedVoucher = await prisma.claimedVoucher.delete({
     *   where: {
     *     // ... filter to delete one ClaimedVoucher
     *   }
     * })
     * 
     */
    delete<T extends ClaimedVoucherDeleteArgs>(args: SelectSubset<T, ClaimedVoucherDeleteArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClaimedVoucher.
     * @param {ClaimedVoucherUpdateArgs} args - Arguments to update one ClaimedVoucher.
     * @example
     * // Update one ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimedVoucherUpdateArgs>(args: SelectSubset<T, ClaimedVoucherUpdateArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClaimedVouchers.
     * @param {ClaimedVoucherDeleteManyArgs} args - Arguments to filter ClaimedVouchers to delete.
     * @example
     * // Delete a few ClaimedVouchers
     * const { count } = await prisma.claimedVoucher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimedVoucherDeleteManyArgs>(args?: SelectSubset<T, ClaimedVoucherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimedVouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClaimedVouchers
     * const claimedVoucher = await prisma.claimedVoucher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimedVoucherUpdateManyArgs>(args: SelectSubset<T, ClaimedVoucherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClaimedVouchers and returns the data updated in the database.
     * @param {ClaimedVoucherUpdateManyAndReturnArgs} args - Arguments to update many ClaimedVouchers.
     * @example
     * // Update many ClaimedVouchers
     * const claimedVoucher = await prisma.claimedVoucher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClaimedVouchers and only return the `id`
     * const claimedVoucherWithIdOnly = await prisma.claimedVoucher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClaimedVoucherUpdateManyAndReturnArgs>(args: SelectSubset<T, ClaimedVoucherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClaimedVoucher.
     * @param {ClaimedVoucherUpsertArgs} args - Arguments to update or create a ClaimedVoucher.
     * @example
     * // Update or create a ClaimedVoucher
     * const claimedVoucher = await prisma.claimedVoucher.upsert({
     *   create: {
     *     // ... data to create a ClaimedVoucher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClaimedVoucher we want to update
     *   }
     * })
     */
    upsert<T extends ClaimedVoucherUpsertArgs>(args: SelectSubset<T, ClaimedVoucherUpsertArgs<ExtArgs>>): Prisma__ClaimedVoucherClient<$Result.GetResult<Prisma.$ClaimedVoucherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClaimedVouchers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherCountArgs} args - Arguments to filter ClaimedVouchers to count.
     * @example
     * // Count the number of ClaimedVouchers
     * const count = await prisma.claimedVoucher.count({
     *   where: {
     *     // ... the filter for the ClaimedVouchers we want to count
     *   }
     * })
    **/
    count<T extends ClaimedVoucherCountArgs>(
      args?: Subset<T, ClaimedVoucherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimedVoucherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClaimedVoucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimedVoucherAggregateArgs>(args: Subset<T, ClaimedVoucherAggregateArgs>): Prisma.PrismaPromise<GetClaimedVoucherAggregateType<T>>

    /**
     * Group by ClaimedVoucher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimedVoucherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimedVoucherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimedVoucherGroupByArgs['orderBy'] }
        : { orderBy?: ClaimedVoucherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimedVoucherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimedVoucherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClaimedVoucher model
   */
  readonly fields: ClaimedVoucherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClaimedVoucher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimedVoucherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    voucher<T extends VoucherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VoucherDefaultArgs<ExtArgs>>): Prisma__VoucherClient<$Result.GetResult<Prisma.$VoucherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClaimedVoucher model
   */
  interface ClaimedVoucherFieldRefs {
    readonly id: FieldRef<"ClaimedVoucher", 'Int'>
    readonly voucherId: FieldRef<"ClaimedVoucher", 'Int'>
    readonly userId: FieldRef<"ClaimedVoucher", 'Int'>
    readonly claimedAt: FieldRef<"ClaimedVoucher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClaimedVoucher findUnique
   */
  export type ClaimedVoucherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter, which ClaimedVoucher to fetch.
     */
    where: ClaimedVoucherWhereUniqueInput
  }

  /**
   * ClaimedVoucher findUniqueOrThrow
   */
  export type ClaimedVoucherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter, which ClaimedVoucher to fetch.
     */
    where: ClaimedVoucherWhereUniqueInput
  }

  /**
   * ClaimedVoucher findFirst
   */
  export type ClaimedVoucherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter, which ClaimedVoucher to fetch.
     */
    where?: ClaimedVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimedVouchers to fetch.
     */
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimedVouchers.
     */
    cursor?: ClaimedVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimedVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimedVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimedVouchers.
     */
    distinct?: ClaimedVoucherScalarFieldEnum | ClaimedVoucherScalarFieldEnum[]
  }

  /**
   * ClaimedVoucher findFirstOrThrow
   */
  export type ClaimedVoucherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter, which ClaimedVoucher to fetch.
     */
    where?: ClaimedVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimedVouchers to fetch.
     */
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClaimedVouchers.
     */
    cursor?: ClaimedVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimedVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimedVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimedVouchers.
     */
    distinct?: ClaimedVoucherScalarFieldEnum | ClaimedVoucherScalarFieldEnum[]
  }

  /**
   * ClaimedVoucher findMany
   */
  export type ClaimedVoucherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter, which ClaimedVouchers to fetch.
     */
    where?: ClaimedVoucherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClaimedVouchers to fetch.
     */
    orderBy?: ClaimedVoucherOrderByWithRelationInput | ClaimedVoucherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClaimedVouchers.
     */
    cursor?: ClaimedVoucherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClaimedVouchers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClaimedVouchers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClaimedVouchers.
     */
    distinct?: ClaimedVoucherScalarFieldEnum | ClaimedVoucherScalarFieldEnum[]
  }

  /**
   * ClaimedVoucher create
   */
  export type ClaimedVoucherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * The data needed to create a ClaimedVoucher.
     */
    data: XOR<ClaimedVoucherCreateInput, ClaimedVoucherUncheckedCreateInput>
  }

  /**
   * ClaimedVoucher createMany
   */
  export type ClaimedVoucherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClaimedVouchers.
     */
    data: ClaimedVoucherCreateManyInput | ClaimedVoucherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClaimedVoucher createManyAndReturn
   */
  export type ClaimedVoucherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * The data used to create many ClaimedVouchers.
     */
    data: ClaimedVoucherCreateManyInput | ClaimedVoucherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimedVoucher update
   */
  export type ClaimedVoucherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * The data needed to update a ClaimedVoucher.
     */
    data: XOR<ClaimedVoucherUpdateInput, ClaimedVoucherUncheckedUpdateInput>
    /**
     * Choose, which ClaimedVoucher to update.
     */
    where: ClaimedVoucherWhereUniqueInput
  }

  /**
   * ClaimedVoucher updateMany
   */
  export type ClaimedVoucherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClaimedVouchers.
     */
    data: XOR<ClaimedVoucherUpdateManyMutationInput, ClaimedVoucherUncheckedUpdateManyInput>
    /**
     * Filter which ClaimedVouchers to update
     */
    where?: ClaimedVoucherWhereInput
    /**
     * Limit how many ClaimedVouchers to update.
     */
    limit?: number
  }

  /**
   * ClaimedVoucher updateManyAndReturn
   */
  export type ClaimedVoucherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * The data used to update ClaimedVouchers.
     */
    data: XOR<ClaimedVoucherUpdateManyMutationInput, ClaimedVoucherUncheckedUpdateManyInput>
    /**
     * Filter which ClaimedVouchers to update
     */
    where?: ClaimedVoucherWhereInput
    /**
     * Limit how many ClaimedVouchers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClaimedVoucher upsert
   */
  export type ClaimedVoucherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * The filter to search for the ClaimedVoucher to update in case it exists.
     */
    where: ClaimedVoucherWhereUniqueInput
    /**
     * In case the ClaimedVoucher found by the `where` argument doesn't exist, create a new ClaimedVoucher with this data.
     */
    create: XOR<ClaimedVoucherCreateInput, ClaimedVoucherUncheckedCreateInput>
    /**
     * In case the ClaimedVoucher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimedVoucherUpdateInput, ClaimedVoucherUncheckedUpdateInput>
  }

  /**
   * ClaimedVoucher delete
   */
  export type ClaimedVoucherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
    /**
     * Filter which ClaimedVoucher to delete.
     */
    where: ClaimedVoucherWhereUniqueInput
  }

  /**
   * ClaimedVoucher deleteMany
   */
  export type ClaimedVoucherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClaimedVouchers to delete
     */
    where?: ClaimedVoucherWhereInput
    /**
     * Limit how many ClaimedVouchers to delete.
     */
    limit?: number
  }

  /**
   * ClaimedVoucher without action
   */
  export type ClaimedVoucherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClaimedVoucher
     */
    select?: ClaimedVoucherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClaimedVoucher
     */
    omit?: ClaimedVoucherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimedVoucherInclude<ExtArgs> | null
  }


  /**
   * Model ChatLog
   */

  export type AggregateChatLog = {
    _count: ChatLogCountAggregateOutputType | null
    _avg: ChatLogAvgAggregateOutputType | null
    _sum: ChatLogSumAggregateOutputType | null
    _min: ChatLogMinAggregateOutputType | null
    _max: ChatLogMaxAggregateOutputType | null
  }

  export type ChatLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    ticketId: number | null
  }

  export type ChatLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    ticketId: number | null
  }

  export type ChatLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    message: string | null
    response: string | null
    isResolved: boolean | null
    ticketId: number | null
    createdAt: Date | null
  }

  export type ChatLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    message: string | null
    response: string | null
    isResolved: boolean | null
    ticketId: number | null
    createdAt: Date | null
  }

  export type ChatLogCountAggregateOutputType = {
    id: number
    userId: number
    message: number
    response: number
    isResolved: number
    ticketId: number
    createdAt: number
    _all: number
  }


  export type ChatLogAvgAggregateInputType = {
    id?: true
    userId?: true
    ticketId?: true
  }

  export type ChatLogSumAggregateInputType = {
    id?: true
    userId?: true
    ticketId?: true
  }

  export type ChatLogMinAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    response?: true
    isResolved?: true
    ticketId?: true
    createdAt?: true
  }

  export type ChatLogMaxAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    response?: true
    isResolved?: true
    ticketId?: true
    createdAt?: true
  }

  export type ChatLogCountAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    response?: true
    isResolved?: true
    ticketId?: true
    createdAt?: true
    _all?: true
  }

  export type ChatLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatLog to aggregate.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatLogs
    **/
    _count?: true | ChatLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatLogMaxAggregateInputType
  }

  export type GetChatLogAggregateType<T extends ChatLogAggregateArgs> = {
        [P in keyof T & keyof AggregateChatLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatLog[P]>
      : GetScalarType<T[P], AggregateChatLog[P]>
  }




  export type ChatLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatLogWhereInput
    orderBy?: ChatLogOrderByWithAggregationInput | ChatLogOrderByWithAggregationInput[]
    by: ChatLogScalarFieldEnum[] | ChatLogScalarFieldEnum
    having?: ChatLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatLogCountAggregateInputType | true
    _avg?: ChatLogAvgAggregateInputType
    _sum?: ChatLogSumAggregateInputType
    _min?: ChatLogMinAggregateInputType
    _max?: ChatLogMaxAggregateInputType
  }

  export type ChatLogGroupByOutputType = {
    id: number
    userId: number
    message: string
    response: string
    isResolved: boolean
    ticketId: number | null
    createdAt: Date
    _count: ChatLogCountAggregateOutputType | null
    _avg: ChatLogAvgAggregateOutputType | null
    _sum: ChatLogSumAggregateOutputType | null
    _min: ChatLogMinAggregateOutputType | null
    _max: ChatLogMaxAggregateOutputType | null
  }

  type GetChatLogGroupByPayload<T extends ChatLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatLogGroupByOutputType[P]>
            : GetScalarType<T[P], ChatLogGroupByOutputType[P]>
        }
      >
    >


  export type ChatLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    response?: boolean
    isResolved?: boolean
    ticketId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    response?: boolean
    isResolved?: boolean
    ticketId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    response?: boolean
    isResolved?: boolean
    ticketId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }, ExtArgs["result"]["chatLog"]>

  export type ChatLogSelectScalar = {
    id?: boolean
    userId?: boolean
    message?: boolean
    response?: boolean
    isResolved?: boolean
    ticketId?: boolean
    createdAt?: boolean
  }

  export type ChatLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "message" | "response" | "isResolved" | "ticketId" | "createdAt", ExtArgs["result"]["chatLog"]>
  export type ChatLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }
  export type ChatLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }
  export type ChatLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    ticket?: boolean | ChatLog$ticketArgs<ExtArgs>
  }

  export type $ChatLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      ticket: Prisma.$TicketPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      message: string
      response: string
      isResolved: boolean
      ticketId: number | null
      createdAt: Date
    }, ExtArgs["result"]["chatLog"]>
    composites: {}
  }

  type ChatLogGetPayload<S extends boolean | null | undefined | ChatLogDefaultArgs> = $Result.GetResult<Prisma.$ChatLogPayload, S>

  type ChatLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatLogCountAggregateInputType | true
    }

  export interface ChatLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatLog'], meta: { name: 'ChatLog' } }
    /**
     * Find zero or one ChatLog that matches the filter.
     * @param {ChatLogFindUniqueArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatLogFindUniqueArgs>(args: SelectSubset<T, ChatLogFindUniqueArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatLogFindUniqueOrThrowArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindFirstArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatLogFindFirstArgs>(args?: SelectSubset<T, ChatLogFindFirstArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindFirstOrThrowArgs} args - Arguments to find a ChatLog
     * @example
     * // Get one ChatLog
     * const chatLog = await prisma.chatLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatLogs
     * const chatLogs = await prisma.chatLog.findMany()
     * 
     * // Get first 10 ChatLogs
     * const chatLogs = await prisma.chatLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatLogFindManyArgs>(args?: SelectSubset<T, ChatLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatLog.
     * @param {ChatLogCreateArgs} args - Arguments to create a ChatLog.
     * @example
     * // Create one ChatLog
     * const ChatLog = await prisma.chatLog.create({
     *   data: {
     *     // ... data to create a ChatLog
     *   }
     * })
     * 
     */
    create<T extends ChatLogCreateArgs>(args: SelectSubset<T, ChatLogCreateArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatLogs.
     * @param {ChatLogCreateManyArgs} args - Arguments to create many ChatLogs.
     * @example
     * // Create many ChatLogs
     * const chatLog = await prisma.chatLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatLogCreateManyArgs>(args?: SelectSubset<T, ChatLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatLogs and returns the data saved in the database.
     * @param {ChatLogCreateManyAndReturnArgs} args - Arguments to create many ChatLogs.
     * @example
     * // Create many ChatLogs
     * const chatLog = await prisma.chatLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatLogs and only return the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatLog.
     * @param {ChatLogDeleteArgs} args - Arguments to delete one ChatLog.
     * @example
     * // Delete one ChatLog
     * const ChatLog = await prisma.chatLog.delete({
     *   where: {
     *     // ... filter to delete one ChatLog
     *   }
     * })
     * 
     */
    delete<T extends ChatLogDeleteArgs>(args: SelectSubset<T, ChatLogDeleteArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatLog.
     * @param {ChatLogUpdateArgs} args - Arguments to update one ChatLog.
     * @example
     * // Update one ChatLog
     * const chatLog = await prisma.chatLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatLogUpdateArgs>(args: SelectSubset<T, ChatLogUpdateArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatLogs.
     * @param {ChatLogDeleteManyArgs} args - Arguments to filter ChatLogs to delete.
     * @example
     * // Delete a few ChatLogs
     * const { count } = await prisma.chatLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatLogDeleteManyArgs>(args?: SelectSubset<T, ChatLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatLogs
     * const chatLog = await prisma.chatLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatLogUpdateManyArgs>(args: SelectSubset<T, ChatLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatLogs and returns the data updated in the database.
     * @param {ChatLogUpdateManyAndReturnArgs} args - Arguments to update many ChatLogs.
     * @example
     * // Update many ChatLogs
     * const chatLog = await prisma.chatLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatLogs and only return the `id`
     * const chatLogWithIdOnly = await prisma.chatLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatLog.
     * @param {ChatLogUpsertArgs} args - Arguments to update or create a ChatLog.
     * @example
     * // Update or create a ChatLog
     * const chatLog = await prisma.chatLog.upsert({
     *   create: {
     *     // ... data to create a ChatLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatLog we want to update
     *   }
     * })
     */
    upsert<T extends ChatLogUpsertArgs>(args: SelectSubset<T, ChatLogUpsertArgs<ExtArgs>>): Prisma__ChatLogClient<$Result.GetResult<Prisma.$ChatLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogCountArgs} args - Arguments to filter ChatLogs to count.
     * @example
     * // Count the number of ChatLogs
     * const count = await prisma.chatLog.count({
     *   where: {
     *     // ... the filter for the ChatLogs we want to count
     *   }
     * })
    **/
    count<T extends ChatLogCountArgs>(
      args?: Subset<T, ChatLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatLogAggregateArgs>(args: Subset<T, ChatLogAggregateArgs>): Prisma.PrismaPromise<GetChatLogAggregateType<T>>

    /**
     * Group by ChatLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatLogGroupByArgs['orderBy'] }
        : { orderBy?: ChatLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatLog model
   */
  readonly fields: ChatLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ticket<T extends ChatLog$ticketArgs<ExtArgs> = {}>(args?: Subset<T, ChatLog$ticketArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChatLog model
   */
  interface ChatLogFieldRefs {
    readonly id: FieldRef<"ChatLog", 'Int'>
    readonly userId: FieldRef<"ChatLog", 'Int'>
    readonly message: FieldRef<"ChatLog", 'String'>
    readonly response: FieldRef<"ChatLog", 'String'>
    readonly isResolved: FieldRef<"ChatLog", 'Boolean'>
    readonly ticketId: FieldRef<"ChatLog", 'Int'>
    readonly createdAt: FieldRef<"ChatLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChatLog findUnique
   */
  export type ChatLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog findUniqueOrThrow
   */
  export type ChatLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog findFirst
   */
  export type ChatLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatLogs.
     */
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog findFirstOrThrow
   */
  export type ChatLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLog to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatLogs.
     */
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog findMany
   */
  export type ChatLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter, which ChatLogs to fetch.
     */
    where?: ChatLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatLogs to fetch.
     */
    orderBy?: ChatLogOrderByWithRelationInput | ChatLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatLogs.
     */
    cursor?: ChatLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatLogs.
     */
    distinct?: ChatLogScalarFieldEnum | ChatLogScalarFieldEnum[]
  }

  /**
   * ChatLog create
   */
  export type ChatLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatLog.
     */
    data: XOR<ChatLogCreateInput, ChatLogUncheckedCreateInput>
  }

  /**
   * ChatLog createMany
   */
  export type ChatLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatLogs.
     */
    data: ChatLogCreateManyInput | ChatLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatLog createManyAndReturn
   */
  export type ChatLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * The data used to create many ChatLogs.
     */
    data: ChatLogCreateManyInput | ChatLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatLog update
   */
  export type ChatLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatLog.
     */
    data: XOR<ChatLogUpdateInput, ChatLogUncheckedUpdateInput>
    /**
     * Choose, which ChatLog to update.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog updateMany
   */
  export type ChatLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatLogs.
     */
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyInput>
    /**
     * Filter which ChatLogs to update
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to update.
     */
    limit?: number
  }

  /**
   * ChatLog updateManyAndReturn
   */
  export type ChatLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * The data used to update ChatLogs.
     */
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyInput>
    /**
     * Filter which ChatLogs to update
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatLog upsert
   */
  export type ChatLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatLog to update in case it exists.
     */
    where: ChatLogWhereUniqueInput
    /**
     * In case the ChatLog found by the `where` argument doesn't exist, create a new ChatLog with this data.
     */
    create: XOR<ChatLogCreateInput, ChatLogUncheckedCreateInput>
    /**
     * In case the ChatLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatLogUpdateInput, ChatLogUncheckedUpdateInput>
  }

  /**
   * ChatLog delete
   */
  export type ChatLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
    /**
     * Filter which ChatLog to delete.
     */
    where: ChatLogWhereUniqueInput
  }

  /**
   * ChatLog deleteMany
   */
  export type ChatLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatLogs to delete
     */
    where?: ChatLogWhereInput
    /**
     * Limit how many ChatLogs to delete.
     */
    limit?: number
  }

  /**
   * ChatLog.ticket
   */
  export type ChatLog$ticketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
  }

  /**
   * ChatLog without action
   */
  export type ChatLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatLog
     */
    select?: ChatLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatLog
     */
    omit?: ChatLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatLogInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: $Enums.NotificationType | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    title: string | null
    message: string | null
    isRead: boolean | null
    type: $Enums.NotificationType | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    isRead: number
    type: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    isRead?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    title: string
    message: string
    isRead: boolean
    type: $Enums.NotificationType
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    isRead?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "isRead" | "type" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      title: string
      message: string
      isRead: boolean
      type: $Enums.NotificationType
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    phone: 'phone',
    address: 'address',
    company: 'company',
    segment: 'segment',
    source: 'source',
    createdAt: 'createdAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    ticketNumber: 'ticketNumber',
    title: 'title',
    description: 'description',
    status: 'status',
    priority: 'priority',
    channel: 'channel',
    customerId: 'customerId',
    assignedTo: 'assignedTo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    resolvedAt: 'resolvedAt'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TicketMessageScalarFieldEnum: {
    id: 'id',
    ticketId: 'ticketId',
    senderId: 'senderId',
    senderRole: 'senderRole',
    message: 'message',
    isInternal: 'isInternal',
    createdAt: 'createdAt'
  };

  export type TicketMessageScalarFieldEnum = (typeof TicketMessageScalarFieldEnum)[keyof typeof TicketMessageScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    ticketId: 'ticketId',
    customerId: 'customerId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const VoucherScalarFieldEnum: {
    id: 'id',
    code: 'code',
    title: 'title',
    description: 'description',
    discount: 'discount',
    validUntil: 'validUntil',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type VoucherScalarFieldEnum = (typeof VoucherScalarFieldEnum)[keyof typeof VoucherScalarFieldEnum]


  export const ClaimedVoucherScalarFieldEnum: {
    id: 'id',
    voucherId: 'voucherId',
    userId: 'userId',
    claimedAt: 'claimedAt'
  };

  export type ClaimedVoucherScalarFieldEnum = (typeof ClaimedVoucherScalarFieldEnum)[keyof typeof ClaimedVoucherScalarFieldEnum]


  export const ChatLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    message: 'message',
    response: 'response',
    isResolved: 'isResolved',
    ticketId: 'ticketId',
    createdAt: 'createdAt'
  };

  export type ChatLogScalarFieldEnum = (typeof ChatLogScalarFieldEnum)[keyof typeof ChatLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    isRead: 'isRead',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CustomerSegment'
   */
  export type EnumCustomerSegmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerSegment'>
    


  /**
   * Reference to a field of type 'CustomerSegment[]'
   */
  export type ListEnumCustomerSegmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CustomerSegment[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'TicketPriority'
   */
  export type EnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority'>
    


  /**
   * Reference to a field of type 'TicketPriority[]'
   */
  export type ListEnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority[]'>
    


  /**
   * Reference to a field of type 'TicketChannel'
   */
  export type EnumTicketChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketChannel'>
    


  /**
   * Reference to a field of type 'TicketChannel[]'
   */
  export type ListEnumTicketChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketChannel[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    assignedTickets?: TicketListRelationFilter
    sentMessages?: TicketMessageListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    claimedVouchers?: ClaimedVoucherListRelationFilter
    chatLogs?: ChatLogListRelationFilter
    notifications?: NotificationListRelationFilter
    tickets?: TicketListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    assignedTickets?: TicketOrderByRelationAggregateInput
    sentMessages?: TicketMessageOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
    claimedVouchers?: ClaimedVoucherOrderByRelationAggregateInput
    chatLogs?: ChatLogOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    assignedTickets?: TicketListRelationFilter
    sentMessages?: TicketMessageListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    claimedVouchers?: ClaimedVoucherListRelationFilter
    chatLogs?: ChatLogListRelationFilter
    notifications?: NotificationListRelationFilter
    tickets?: TicketListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: IntFilter<"Customer"> | number
    userId?: IntFilter<"Customer"> | number
    phone?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    company?: StringNullableFilter<"Customer"> | string | null
    segment?: EnumCustomerSegmentFilter<"Customer"> | $Enums.CustomerSegment
    source?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    segment?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    phone?: StringNullableFilter<"Customer"> | string | null
    address?: StringNullableFilter<"Customer"> | string | null
    company?: StringNullableFilter<"Customer"> | string | null
    segment?: EnumCustomerSegmentFilter<"Customer"> | $Enums.CustomerSegment
    source?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    segment?: SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Customer"> | number
    userId?: IntWithAggregatesFilter<"Customer"> | number
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    address?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    company?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    segment?: EnumCustomerSegmentWithAggregatesFilter<"Customer"> | $Enums.CustomerSegment
    source?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: IntFilter<"Ticket"> | number
    ticketNumber?: StringFilter<"Ticket"> | string
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"Ticket"> | $Enums.TicketPriority
    channel?: EnumTicketChannelFilter<"Ticket"> | $Enums.TicketChannel
    customerId?: IntFilter<"Ticket"> | number
    assignedTo?: IntNullableFilter<"Ticket"> | number | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
    agent?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: TicketMessageListRelationFilter
    feedback?: XOR<FeedbackNullableScalarRelationFilter, FeedbackWhereInput> | null
    chatLogs?: ChatLogListRelationFilter
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    channel?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    customer?: UserOrderByWithRelationInput
    agent?: UserOrderByWithRelationInput
    messages?: TicketMessageOrderByRelationAggregateInput
    feedback?: FeedbackOrderByWithRelationInput
    chatLogs?: ChatLogOrderByRelationAggregateInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ticketNumber?: string
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"Ticket"> | $Enums.TicketPriority
    channel?: EnumTicketChannelFilter<"Ticket"> | $Enums.TicketChannel
    customerId?: IntFilter<"Ticket"> | number
    assignedTo?: IntNullableFilter<"Ticket"> | number | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
    agent?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: TicketMessageListRelationFilter
    feedback?: XOR<FeedbackNullableScalarRelationFilter, FeedbackWhereInput> | null
    chatLogs?: ChatLogListRelationFilter
  }, "id" | "ticketNumber">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    channel?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ticket"> | number
    ticketNumber?: StringWithAggregatesFilter<"Ticket"> | string
    title?: StringWithAggregatesFilter<"Ticket"> | string
    description?: StringWithAggregatesFilter<"Ticket"> | string
    status?: EnumTicketStatusWithAggregatesFilter<"Ticket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityWithAggregatesFilter<"Ticket"> | $Enums.TicketPriority
    channel?: EnumTicketChannelWithAggregatesFilter<"Ticket"> | $Enums.TicketChannel
    customerId?: IntWithAggregatesFilter<"Ticket"> | number
    assignedTo?: IntNullableWithAggregatesFilter<"Ticket"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
  }

  export type TicketMessageWhereInput = {
    AND?: TicketMessageWhereInput | TicketMessageWhereInput[]
    OR?: TicketMessageWhereInput[]
    NOT?: TicketMessageWhereInput | TicketMessageWhereInput[]
    id?: IntFilter<"TicketMessage"> | number
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    senderRole?: StringFilter<"TicketMessage"> | string
    message?: StringFilter<"TicketMessage"> | string
    isInternal?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TicketMessageOrderByWithRelationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    senderRole?: SortOrder
    message?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    ticket?: TicketOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type TicketMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TicketMessageWhereInput | TicketMessageWhereInput[]
    OR?: TicketMessageWhereInput[]
    NOT?: TicketMessageWhereInput | TicketMessageWhereInput[]
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    senderRole?: StringFilter<"TicketMessage"> | string
    message?: StringFilter<"TicketMessage"> | string
    isInternal?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TicketMessageOrderByWithAggregationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    senderRole?: SortOrder
    message?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
    _count?: TicketMessageCountOrderByAggregateInput
    _avg?: TicketMessageAvgOrderByAggregateInput
    _max?: TicketMessageMaxOrderByAggregateInput
    _min?: TicketMessageMinOrderByAggregateInput
    _sum?: TicketMessageSumOrderByAggregateInput
  }

  export type TicketMessageScalarWhereWithAggregatesInput = {
    AND?: TicketMessageScalarWhereWithAggregatesInput | TicketMessageScalarWhereWithAggregatesInput[]
    OR?: TicketMessageScalarWhereWithAggregatesInput[]
    NOT?: TicketMessageScalarWhereWithAggregatesInput | TicketMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TicketMessage"> | number
    ticketId?: IntWithAggregatesFilter<"TicketMessage"> | number
    senderId?: IntWithAggregatesFilter<"TicketMessage"> | number
    senderRole?: StringWithAggregatesFilter<"TicketMessage"> | string
    message?: StringWithAggregatesFilter<"TicketMessage"> | string
    isInternal?: BoolWithAggregatesFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TicketMessage"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: IntFilter<"Feedback"> | number
    ticketId?: IntFilter<"Feedback"> | number
    customerId?: IntFilter<"Feedback"> | number
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    ticket?: TicketOrderByWithRelationInput
    customer?: UserOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    ticketId?: number
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    customerId?: IntFilter<"Feedback"> | number
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    ticket?: XOR<TicketScalarRelationFilter, TicketWhereInput>
    customer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "ticketId">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Feedback"> | number
    ticketId?: IntWithAggregatesFilter<"Feedback"> | number
    customerId?: IntWithAggregatesFilter<"Feedback"> | number
    rating?: IntWithAggregatesFilter<"Feedback"> | number
    comment?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type VoucherWhereInput = {
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    id?: IntFilter<"Voucher"> | number
    code?: StringFilter<"Voucher"> | string
    title?: StringFilter<"Voucher"> | string
    description?: StringNullableFilter<"Voucher"> | string | null
    discount?: IntFilter<"Voucher"> | number
    validUntil?: DateTimeFilter<"Voucher"> | Date | string
    isActive?: BoolFilter<"Voucher"> | boolean
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    claimedVouchers?: ClaimedVoucherListRelationFilter
  }

  export type VoucherOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    discount?: SortOrder
    validUntil?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    claimedVouchers?: ClaimedVoucherOrderByRelationAggregateInput
  }

  export type VoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: VoucherWhereInput | VoucherWhereInput[]
    OR?: VoucherWhereInput[]
    NOT?: VoucherWhereInput | VoucherWhereInput[]
    title?: StringFilter<"Voucher"> | string
    description?: StringNullableFilter<"Voucher"> | string | null
    discount?: IntFilter<"Voucher"> | number
    validUntil?: DateTimeFilter<"Voucher"> | Date | string
    isActive?: BoolFilter<"Voucher"> | boolean
    createdAt?: DateTimeFilter<"Voucher"> | Date | string
    claimedVouchers?: ClaimedVoucherListRelationFilter
  }, "id" | "code">

  export type VoucherOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    discount?: SortOrder
    validUntil?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: VoucherCountOrderByAggregateInput
    _avg?: VoucherAvgOrderByAggregateInput
    _max?: VoucherMaxOrderByAggregateInput
    _min?: VoucherMinOrderByAggregateInput
    _sum?: VoucherSumOrderByAggregateInput
  }

  export type VoucherScalarWhereWithAggregatesInput = {
    AND?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    OR?: VoucherScalarWhereWithAggregatesInput[]
    NOT?: VoucherScalarWhereWithAggregatesInput | VoucherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Voucher"> | number
    code?: StringWithAggregatesFilter<"Voucher"> | string
    title?: StringWithAggregatesFilter<"Voucher"> | string
    description?: StringNullableWithAggregatesFilter<"Voucher"> | string | null
    discount?: IntWithAggregatesFilter<"Voucher"> | number
    validUntil?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Voucher"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Voucher"> | Date | string
  }

  export type ClaimedVoucherWhereInput = {
    AND?: ClaimedVoucherWhereInput | ClaimedVoucherWhereInput[]
    OR?: ClaimedVoucherWhereInput[]
    NOT?: ClaimedVoucherWhereInput | ClaimedVoucherWhereInput[]
    id?: IntFilter<"ClaimedVoucher"> | number
    voucherId?: IntFilter<"ClaimedVoucher"> | number
    userId?: IntFilter<"ClaimedVoucher"> | number
    claimedAt?: DateTimeFilter<"ClaimedVoucher"> | Date | string
    voucher?: XOR<VoucherScalarRelationFilter, VoucherWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ClaimedVoucherOrderByWithRelationInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
    claimedAt?: SortOrder
    voucher?: VoucherOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ClaimedVoucherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    voucherId_userId?: ClaimedVoucherVoucherIdUserIdCompoundUniqueInput
    AND?: ClaimedVoucherWhereInput | ClaimedVoucherWhereInput[]
    OR?: ClaimedVoucherWhereInput[]
    NOT?: ClaimedVoucherWhereInput | ClaimedVoucherWhereInput[]
    voucherId?: IntFilter<"ClaimedVoucher"> | number
    userId?: IntFilter<"ClaimedVoucher"> | number
    claimedAt?: DateTimeFilter<"ClaimedVoucher"> | Date | string
    voucher?: XOR<VoucherScalarRelationFilter, VoucherWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "voucherId_userId">

  export type ClaimedVoucherOrderByWithAggregationInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
    claimedAt?: SortOrder
    _count?: ClaimedVoucherCountOrderByAggregateInput
    _avg?: ClaimedVoucherAvgOrderByAggregateInput
    _max?: ClaimedVoucherMaxOrderByAggregateInput
    _min?: ClaimedVoucherMinOrderByAggregateInput
    _sum?: ClaimedVoucherSumOrderByAggregateInput
  }

  export type ClaimedVoucherScalarWhereWithAggregatesInput = {
    AND?: ClaimedVoucherScalarWhereWithAggregatesInput | ClaimedVoucherScalarWhereWithAggregatesInput[]
    OR?: ClaimedVoucherScalarWhereWithAggregatesInput[]
    NOT?: ClaimedVoucherScalarWhereWithAggregatesInput | ClaimedVoucherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClaimedVoucher"> | number
    voucherId?: IntWithAggregatesFilter<"ClaimedVoucher"> | number
    userId?: IntWithAggregatesFilter<"ClaimedVoucher"> | number
    claimedAt?: DateTimeWithAggregatesFilter<"ClaimedVoucher"> | Date | string
  }

  export type ChatLogWhereInput = {
    AND?: ChatLogWhereInput | ChatLogWhereInput[]
    OR?: ChatLogWhereInput[]
    NOT?: ChatLogWhereInput | ChatLogWhereInput[]
    id?: IntFilter<"ChatLog"> | number
    userId?: IntFilter<"ChatLog"> | number
    message?: StringFilter<"ChatLog"> | string
    response?: StringFilter<"ChatLog"> | string
    isResolved?: BoolFilter<"ChatLog"> | boolean
    ticketId?: IntNullableFilter<"ChatLog"> | number | null
    createdAt?: DateTimeFilter<"ChatLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
  }

  export type ChatLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    response?: SortOrder
    isResolved?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    ticket?: TicketOrderByWithRelationInput
  }

  export type ChatLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChatLogWhereInput | ChatLogWhereInput[]
    OR?: ChatLogWhereInput[]
    NOT?: ChatLogWhereInput | ChatLogWhereInput[]
    userId?: IntFilter<"ChatLog"> | number
    message?: StringFilter<"ChatLog"> | string
    response?: StringFilter<"ChatLog"> | string
    isResolved?: BoolFilter<"ChatLog"> | boolean
    ticketId?: IntNullableFilter<"ChatLog"> | number | null
    createdAt?: DateTimeFilter<"ChatLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    ticket?: XOR<TicketNullableScalarRelationFilter, TicketWhereInput> | null
  }, "id">

  export type ChatLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    response?: SortOrder
    isResolved?: SortOrder
    ticketId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChatLogCountOrderByAggregateInput
    _avg?: ChatLogAvgOrderByAggregateInput
    _max?: ChatLogMaxOrderByAggregateInput
    _min?: ChatLogMinOrderByAggregateInput
    _sum?: ChatLogSumOrderByAggregateInput
  }

  export type ChatLogScalarWhereWithAggregatesInput = {
    AND?: ChatLogScalarWhereWithAggregatesInput | ChatLogScalarWhereWithAggregatesInput[]
    OR?: ChatLogScalarWhereWithAggregatesInput[]
    NOT?: ChatLogScalarWhereWithAggregatesInput | ChatLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChatLog"> | number
    userId?: IntWithAggregatesFilter<"ChatLog"> | number
    message?: StringWithAggregatesFilter<"ChatLog"> | string
    response?: StringWithAggregatesFilter<"ChatLog"> | string
    isResolved?: BoolWithAggregatesFilter<"ChatLog"> | boolean
    ticketId?: IntNullableWithAggregatesFilter<"ChatLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ChatLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateInput = {
    phone?: string | null
    address?: string | null
    company?: string | null
    segment?: $Enums.CustomerSegment
    source?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: number
    userId: number
    phone?: string | null
    address?: string | null
    company?: string | null
    segment?: $Enums.CustomerSegment
    source?: string | null
    createdAt?: Date | string
  }

  export type CustomerUpdateInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: number
    userId: number
    phone?: string | null
    address?: string | null
    company?: string | null
    segment?: $Enums.CustomerSegment
    source?: string | null
    createdAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutTicketsInput
    agent?: UserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    feedback?: FeedbackCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    feedback?: FeedbackUncheckedCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketUpdateInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutTicketsNestedInput
    agent?: UserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUncheckedUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketCreateManyInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type TicketUpdateManyMutationInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketMessageCreateInput = {
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type TicketMessageUncheckedCreateInput = {
    id?: number
    ticketId: number
    senderId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageUpdateInput = {
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageCreateManyInput = {
    id?: number
    ticketId: number
    senderId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageUpdateManyMutationInput = {
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutFeedbackInput
    customer: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: number
    ticketId: number
    customerId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutFeedbackNestedInput
    customer?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    customerId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: number
    ticketId: number
    customerId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    customerId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherCreateInput = {
    code: string
    title: string
    description?: string | null
    discount: number
    validUntil: Date | string
    isActive?: boolean
    createdAt?: Date | string
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUncheckedCreateInput = {
    id?: number
    code: string
    title: string
    description?: string | null
    discount: number
    validUntil: Date | string
    isActive?: boolean
    createdAt?: Date | string
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutVoucherInput
  }

  export type VoucherUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutVoucherNestedInput
  }

  export type VoucherCreateManyInput = {
    id?: number
    code: string
    title: string
    description?: string | null
    discount: number
    validUntil: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type VoucherUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherCreateInput = {
    claimedAt?: Date | string
    voucher: VoucherCreateNestedOneWithoutClaimedVouchersInput
    user: UserCreateNestedOneWithoutClaimedVouchersInput
  }

  export type ClaimedVoucherUncheckedCreateInput = {
    id?: number
    voucherId: number
    userId: number
    claimedAt?: Date | string
  }

  export type ClaimedVoucherUpdateInput = {
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucher?: VoucherUpdateOneRequiredWithoutClaimedVouchersNestedInput
    user?: UserUpdateOneRequiredWithoutClaimedVouchersNestedInput
  }

  export type ClaimedVoucherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    voucherId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherCreateManyInput = {
    id?: number
    voucherId: number
    userId: number
    claimedAt?: Date | string
  }

  export type ClaimedVoucherUpdateManyMutationInput = {
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    voucherId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogCreateInput = {
    message: string
    response: string
    isResolved?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutChatLogsInput
    ticket?: TicketCreateNestedOneWithoutChatLogsInput
  }

  export type ChatLogUncheckedCreateInput = {
    id?: number
    userId: number
    message: string
    response: string
    isResolved?: boolean
    ticketId?: number | null
    createdAt?: Date | string
  }

  export type ChatLogUpdateInput = {
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChatLogsNestedInput
    ticket?: TicketUpdateOneWithoutChatLogsNestedInput
  }

  export type ChatLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    ticketId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogCreateManyInput = {
    id?: number
    userId: number
    message: string
    response: string
    isResolved?: boolean
    ticketId?: number | null
    createdAt?: Date | string
  }

  export type ChatLogUpdateManyMutationInput = {
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    ticketId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type TicketMessageListRelationFilter = {
    every?: TicketMessageWhereInput
    some?: TicketMessageWhereInput
    none?: TicketMessageWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type ClaimedVoucherListRelationFilter = {
    every?: ClaimedVoucherWhereInput
    some?: ClaimedVoucherWhereInput
    none?: ClaimedVoucherWhereInput
  }

  export type ChatLogListRelationFilter = {
    every?: ChatLogWhereInput
    some?: ChatLogWhereInput
    none?: ChatLogWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClaimedVoucherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumCustomerSegmentFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerSegment | EnumCustomerSegmentFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerSegmentFilter<$PrismaModel> | $Enums.CustomerSegment
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    company?: SortOrder
    segment?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    company?: SortOrder
    segment?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    company?: SortOrder
    segment?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumCustomerSegmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerSegment | EnumCustomerSegmentFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerSegmentWithAggregatesFilter<$PrismaModel> | $Enums.CustomerSegment
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerSegmentFilter<$PrismaModel>
    _max?: NestedEnumCustomerSegmentFilter<$PrismaModel>
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type EnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type EnumTicketChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketChannel | EnumTicketChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketChannelFilter<$PrismaModel> | $Enums.TicketChannel
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type FeedbackNullableScalarRelationFilter = {
    is?: FeedbackWhereInput | null
    isNot?: FeedbackWhereInput | null
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    channel?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    channel?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    channel?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    assignedTo?: SortOrder
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type EnumTicketChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketChannel | EnumTicketChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketChannelWithAggregatesFilter<$PrismaModel> | $Enums.TicketChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketChannelFilter<$PrismaModel>
    _max?: NestedEnumTicketChannelFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TicketScalarRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type TicketMessageCountOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    senderRole?: SortOrder
    message?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
  }

  export type TicketMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    senderRole?: SortOrder
    message?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageMinOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
    senderRole?: SortOrder
    message?: SortOrder
    isInternal?: SortOrder
    createdAt?: SortOrder
  }

  export type TicketMessageSumOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    senderId?: SortOrder
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    id?: SortOrder
    ticketId?: SortOrder
    customerId?: SortOrder
    rating?: SortOrder
  }

  export type VoucherCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    discount?: SortOrder
    validUntil?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type VoucherAvgOrderByAggregateInput = {
    id?: SortOrder
    discount?: SortOrder
  }

  export type VoucherMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    discount?: SortOrder
    validUntil?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type VoucherMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    title?: SortOrder
    description?: SortOrder
    discount?: SortOrder
    validUntil?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type VoucherSumOrderByAggregateInput = {
    id?: SortOrder
    discount?: SortOrder
  }

  export type VoucherScalarRelationFilter = {
    is?: VoucherWhereInput
    isNot?: VoucherWhereInput
  }

  export type ClaimedVoucherVoucherIdUserIdCompoundUniqueInput = {
    voucherId: number
    userId: number
  }

  export type ClaimedVoucherCountOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
    claimedAt?: SortOrder
  }

  export type ClaimedVoucherAvgOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
  }

  export type ClaimedVoucherMaxOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
    claimedAt?: SortOrder
  }

  export type ClaimedVoucherMinOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
    claimedAt?: SortOrder
  }

  export type ClaimedVoucherSumOrderByAggregateInput = {
    id?: SortOrder
    voucherId?: SortOrder
    userId?: SortOrder
  }

  export type TicketNullableScalarRelationFilter = {
    is?: TicketWhereInput | null
    isNot?: TicketWhereInput | null
  }

  export type ChatLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    response?: SortOrder
    isResolved?: SortOrder
    ticketId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketId?: SortOrder
  }

  export type ChatLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    response?: SortOrder
    isResolved?: SortOrder
    ticketId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    response?: SortOrder
    isResolved?: SortOrder
    ticketId?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketId?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type CustomerCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutAgentInput = {
    create?: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput> | TicketCreateWithoutAgentInput[] | TicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAgentInput | TicketCreateOrConnectWithoutAgentInput[]
    createMany?: TicketCreateManyAgentInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketMessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutCustomerInput = {
    create?: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput> | FeedbackCreateWithoutCustomerInput[] | FeedbackUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCustomerInput | FeedbackCreateOrConnectWithoutCustomerInput[]
    createMany?: FeedbackCreateManyCustomerInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type ClaimedVoucherCreateNestedManyWithoutUserInput = {
    create?: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput> | ClaimedVoucherCreateWithoutUserInput[] | ClaimedVoucherUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutUserInput | ClaimedVoucherCreateOrConnectWithoutUserInput[]
    createMany?: ClaimedVoucherCreateManyUserInputEnvelope
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
  }

  export type ChatLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput> | ChatLogCreateWithoutUserInput[] | ChatLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutUserInput | ChatLogCreateOrConnectWithoutUserInput[]
    createMany?: ChatLogCreateManyUserInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput> | TicketCreateWithoutCustomerInput[] | TicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCustomerInput | TicketCreateOrConnectWithoutCustomerInput[]
    createMany?: TicketCreateManyCustomerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type CustomerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    connect?: CustomerWhereUniqueInput
  }

  export type TicketUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput> | TicketCreateWithoutAgentInput[] | TicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAgentInput | TicketCreateOrConnectWithoutAgentInput[]
    createMany?: TicketCreateManyAgentInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput> | FeedbackCreateWithoutCustomerInput[] | FeedbackUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCustomerInput | FeedbackCreateOrConnectWithoutCustomerInput[]
    createMany?: FeedbackCreateManyCustomerInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput> | ClaimedVoucherCreateWithoutUserInput[] | ClaimedVoucherUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutUserInput | ClaimedVoucherCreateOrConnectWithoutUserInput[]
    createMany?: ClaimedVoucherCreateManyUserInputEnvelope
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
  }

  export type ChatLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput> | ChatLogCreateWithoutUserInput[] | ChatLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutUserInput | ChatLogCreateOrConnectWithoutUserInput[]
    createMany?: ChatLogCreateManyUserInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput> | TicketCreateWithoutCustomerInput[] | TicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCustomerInput | TicketCreateOrConnectWithoutCustomerInput[]
    createMany?: TicketCreateManyCustomerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CustomerUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type TicketUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput> | TicketCreateWithoutAgentInput[] | TicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAgentInput | TicketCreateOrConnectWithoutAgentInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAgentInput | TicketUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TicketCreateManyAgentInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAgentInput | TicketUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAgentInput | TicketUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketMessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutSenderInput | TicketMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutSenderInput | TicketMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutSenderInput | TicketMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput> | FeedbackCreateWithoutCustomerInput[] | FeedbackUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCustomerInput | FeedbackCreateOrConnectWithoutCustomerInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutCustomerInput | FeedbackUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: FeedbackCreateManyCustomerInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutCustomerInput | FeedbackUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutCustomerInput | FeedbackUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type ClaimedVoucherUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput> | ClaimedVoucherCreateWithoutUserInput[] | ClaimedVoucherUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutUserInput | ClaimedVoucherCreateOrConnectWithoutUserInput[]
    upsert?: ClaimedVoucherUpsertWithWhereUniqueWithoutUserInput | ClaimedVoucherUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClaimedVoucherCreateManyUserInputEnvelope
    set?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    disconnect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    delete?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    update?: ClaimedVoucherUpdateWithWhereUniqueWithoutUserInput | ClaimedVoucherUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClaimedVoucherUpdateManyWithWhereWithoutUserInput | ClaimedVoucherUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
  }

  export type ChatLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput> | ChatLogCreateWithoutUserInput[] | ChatLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutUserInput | ChatLogCreateOrConnectWithoutUserInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutUserInput | ChatLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatLogCreateManyUserInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutUserInput | ChatLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutUserInput | ChatLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput> | TicketCreateWithoutCustomerInput[] | TicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCustomerInput | TicketCreateOrConnectWithoutCustomerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCustomerInput | TicketUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TicketCreateManyCustomerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCustomerInput | TicketUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCustomerInput | TicketUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CustomerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutUserInput
    upsert?: CustomerUpsertWithoutUserInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutUserInput, CustomerUpdateWithoutUserInput>, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type TicketUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput> | TicketCreateWithoutAgentInput[] | TicketUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAgentInput | TicketCreateOrConnectWithoutAgentInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAgentInput | TicketUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: TicketCreateManyAgentInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAgentInput | TicketUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAgentInput | TicketUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput> | TicketMessageCreateWithoutSenderInput[] | TicketMessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutSenderInput | TicketMessageCreateOrConnectWithoutSenderInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutSenderInput | TicketMessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TicketMessageCreateManySenderInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutSenderInput | TicketMessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutSenderInput | TicketMessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput> | FeedbackCreateWithoutCustomerInput[] | FeedbackUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutCustomerInput | FeedbackCreateOrConnectWithoutCustomerInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutCustomerInput | FeedbackUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: FeedbackCreateManyCustomerInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutCustomerInput | FeedbackUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutCustomerInput | FeedbackUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput> | ClaimedVoucherCreateWithoutUserInput[] | ClaimedVoucherUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutUserInput | ClaimedVoucherCreateOrConnectWithoutUserInput[]
    upsert?: ClaimedVoucherUpsertWithWhereUniqueWithoutUserInput | ClaimedVoucherUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ClaimedVoucherCreateManyUserInputEnvelope
    set?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    disconnect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    delete?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    update?: ClaimedVoucherUpdateWithWhereUniqueWithoutUserInput | ClaimedVoucherUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ClaimedVoucherUpdateManyWithWhereWithoutUserInput | ClaimedVoucherUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
  }

  export type ChatLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput> | ChatLogCreateWithoutUserInput[] | ChatLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutUserInput | ChatLogCreateOrConnectWithoutUserInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutUserInput | ChatLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChatLogCreateManyUserInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutUserInput | ChatLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutUserInput | ChatLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput> | TicketCreateWithoutCustomerInput[] | TicketUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutCustomerInput | TicketCreateOrConnectWithoutCustomerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutCustomerInput | TicketUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: TicketCreateManyCustomerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutCustomerInput | TicketUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutCustomerInput | TicketUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCustomerInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumCustomerSegmentFieldUpdateOperationsInput = {
    set?: $Enums.CustomerSegment
  }

  export type UserUpdateOneRequiredWithoutCustomerNestedInput = {
    create?: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerInput
    upsert?: UserUpsertWithoutCustomerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomerInput, UserUpdateWithoutCustomerInput>, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserCreateNestedOneWithoutTicketsInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignedTicketsInput = {
    create?: XOR<UserCreateWithoutAssignedTicketsInput, UserUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketMessageCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type FeedbackCreateNestedOneWithoutTicketInput = {
    create?: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
    connectOrCreate?: FeedbackCreateOrConnectWithoutTicketInput
    connect?: FeedbackWhereUniqueInput
  }

  export type ChatLogCreateNestedManyWithoutTicketInput = {
    create?: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput> | ChatLogCreateWithoutTicketInput[] | ChatLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutTicketInput | ChatLogCreateOrConnectWithoutTicketInput[]
    createMany?: ChatLogCreateManyTicketInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type TicketMessageUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedOneWithoutTicketInput = {
    create?: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
    connectOrCreate?: FeedbackCreateOrConnectWithoutTicketInput
    connect?: FeedbackWhereUniqueInput
  }

  export type ChatLogUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput> | ChatLogCreateWithoutTicketInput[] | ChatLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutTicketInput | ChatLogCreateOrConnectWithoutTicketInput[]
    createMany?: ChatLogCreateManyTicketInputEnvelope
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type EnumTicketPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TicketPriority
  }

  export type EnumTicketChannelFieldUpdateOperationsInput = {
    set?: $Enums.TicketChannel
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketsInput
    upsert?: UserUpsertWithoutTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketsInput, UserUpdateWithoutTicketsInput>, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateOneWithoutAssignedTicketsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedTicketsInput, UserUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedTicketsInput
    upsert?: UserUpsertWithoutAssignedTicketsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedTicketsInput, UserUpdateWithoutAssignedTicketsInput>, UserUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type TicketMessageUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutTicketInput | TicketMessageUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutTicketInput | TicketMessageUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutTicketInput | TicketMessageUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type FeedbackUpdateOneWithoutTicketNestedInput = {
    create?: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
    connectOrCreate?: FeedbackCreateOrConnectWithoutTicketInput
    upsert?: FeedbackUpsertWithoutTicketInput
    disconnect?: FeedbackWhereInput | boolean
    delete?: FeedbackWhereInput | boolean
    connect?: FeedbackWhereUniqueInput
    update?: XOR<XOR<FeedbackUpdateToOneWithWhereWithoutTicketInput, FeedbackUpdateWithoutTicketInput>, FeedbackUncheckedUpdateWithoutTicketInput>
  }

  export type ChatLogUpdateManyWithoutTicketNestedInput = {
    create?: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput> | ChatLogCreateWithoutTicketInput[] | ChatLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutTicketInput | ChatLogCreateOrConnectWithoutTicketInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutTicketInput | ChatLogUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: ChatLogCreateManyTicketInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutTicketInput | ChatLogUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutTicketInput | ChatLogUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TicketMessageUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput> | TicketMessageCreateWithoutTicketInput[] | TicketMessageUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: TicketMessageCreateOrConnectWithoutTicketInput | TicketMessageCreateOrConnectWithoutTicketInput[]
    upsert?: TicketMessageUpsertWithWhereUniqueWithoutTicketInput | TicketMessageUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: TicketMessageCreateManyTicketInputEnvelope
    set?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    disconnect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    delete?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    connect?: TicketMessageWhereUniqueInput | TicketMessageWhereUniqueInput[]
    update?: TicketMessageUpdateWithWhereUniqueWithoutTicketInput | TicketMessageUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: TicketMessageUpdateManyWithWhereWithoutTicketInput | TicketMessageUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateOneWithoutTicketNestedInput = {
    create?: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
    connectOrCreate?: FeedbackCreateOrConnectWithoutTicketInput
    upsert?: FeedbackUpsertWithoutTicketInput
    disconnect?: FeedbackWhereInput | boolean
    delete?: FeedbackWhereInput | boolean
    connect?: FeedbackWhereUniqueInput
    update?: XOR<XOR<FeedbackUpdateToOneWithWhereWithoutTicketInput, FeedbackUpdateWithoutTicketInput>, FeedbackUncheckedUpdateWithoutTicketInput>
  }

  export type ChatLogUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput> | ChatLogCreateWithoutTicketInput[] | ChatLogUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: ChatLogCreateOrConnectWithoutTicketInput | ChatLogCreateOrConnectWithoutTicketInput[]
    upsert?: ChatLogUpsertWithWhereUniqueWithoutTicketInput | ChatLogUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: ChatLogCreateManyTicketInputEnvelope
    set?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    disconnect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    delete?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    connect?: ChatLogWhereUniqueInput | ChatLogWhereUniqueInput[]
    update?: ChatLogUpdateWithWhereUniqueWithoutTicketInput | ChatLogUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: ChatLogUpdateManyWithWhereWithoutTicketInput | ChatLogUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TicketCreateWithoutMessagesInput, TicketUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TicketCreateOrConnectWithoutMessagesInput
    connect?: TicketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type TicketUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<TicketCreateWithoutMessagesInput, TicketUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TicketCreateOrConnectWithoutMessagesInput
    upsert?: TicketUpsertWithoutMessagesInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutMessagesInput, TicketUpdateWithoutMessagesInput>, TicketUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type TicketCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<TicketCreateWithoutFeedbackInput, TicketUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: TicketCreateOrConnectWithoutFeedbackInput
    connect?: TicketWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
  }

  export type TicketUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<TicketCreateWithoutFeedbackInput, TicketUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: TicketCreateOrConnectWithoutFeedbackInput
    upsert?: TicketUpsertWithoutFeedbackInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutFeedbackInput, TicketUpdateWithoutFeedbackInput>, TicketUncheckedUpdateWithoutFeedbackInput>
  }

  export type UserUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    upsert?: UserUpsertWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksInput, UserUpdateWithoutFeedbacksInput>, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type ClaimedVoucherCreateNestedManyWithoutVoucherInput = {
    create?: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput> | ClaimedVoucherCreateWithoutVoucherInput[] | ClaimedVoucherUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutVoucherInput | ClaimedVoucherCreateOrConnectWithoutVoucherInput[]
    createMany?: ClaimedVoucherCreateManyVoucherInputEnvelope
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
  }

  export type ClaimedVoucherUncheckedCreateNestedManyWithoutVoucherInput = {
    create?: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput> | ClaimedVoucherCreateWithoutVoucherInput[] | ClaimedVoucherUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutVoucherInput | ClaimedVoucherCreateOrConnectWithoutVoucherInput[]
    createMany?: ClaimedVoucherCreateManyVoucherInputEnvelope
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
  }

  export type ClaimedVoucherUpdateManyWithoutVoucherNestedInput = {
    create?: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput> | ClaimedVoucherCreateWithoutVoucherInput[] | ClaimedVoucherUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutVoucherInput | ClaimedVoucherCreateOrConnectWithoutVoucherInput[]
    upsert?: ClaimedVoucherUpsertWithWhereUniqueWithoutVoucherInput | ClaimedVoucherUpsertWithWhereUniqueWithoutVoucherInput[]
    createMany?: ClaimedVoucherCreateManyVoucherInputEnvelope
    set?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    disconnect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    delete?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    update?: ClaimedVoucherUpdateWithWhereUniqueWithoutVoucherInput | ClaimedVoucherUpdateWithWhereUniqueWithoutVoucherInput[]
    updateMany?: ClaimedVoucherUpdateManyWithWhereWithoutVoucherInput | ClaimedVoucherUpdateManyWithWhereWithoutVoucherInput[]
    deleteMany?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
  }

  export type ClaimedVoucherUncheckedUpdateManyWithoutVoucherNestedInput = {
    create?: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput> | ClaimedVoucherCreateWithoutVoucherInput[] | ClaimedVoucherUncheckedCreateWithoutVoucherInput[]
    connectOrCreate?: ClaimedVoucherCreateOrConnectWithoutVoucherInput | ClaimedVoucherCreateOrConnectWithoutVoucherInput[]
    upsert?: ClaimedVoucherUpsertWithWhereUniqueWithoutVoucherInput | ClaimedVoucherUpsertWithWhereUniqueWithoutVoucherInput[]
    createMany?: ClaimedVoucherCreateManyVoucherInputEnvelope
    set?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    disconnect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    delete?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    connect?: ClaimedVoucherWhereUniqueInput | ClaimedVoucherWhereUniqueInput[]
    update?: ClaimedVoucherUpdateWithWhereUniqueWithoutVoucherInput | ClaimedVoucherUpdateWithWhereUniqueWithoutVoucherInput[]
    updateMany?: ClaimedVoucherUpdateManyWithWhereWithoutVoucherInput | ClaimedVoucherUpdateManyWithWhereWithoutVoucherInput[]
    deleteMany?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
  }

  export type VoucherCreateNestedOneWithoutClaimedVouchersInput = {
    create?: XOR<VoucherCreateWithoutClaimedVouchersInput, VoucherUncheckedCreateWithoutClaimedVouchersInput>
    connectOrCreate?: VoucherCreateOrConnectWithoutClaimedVouchersInput
    connect?: VoucherWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimedVouchersInput = {
    create?: XOR<UserCreateWithoutClaimedVouchersInput, UserUncheckedCreateWithoutClaimedVouchersInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimedVouchersInput
    connect?: UserWhereUniqueInput
  }

  export type VoucherUpdateOneRequiredWithoutClaimedVouchersNestedInput = {
    create?: XOR<VoucherCreateWithoutClaimedVouchersInput, VoucherUncheckedCreateWithoutClaimedVouchersInput>
    connectOrCreate?: VoucherCreateOrConnectWithoutClaimedVouchersInput
    upsert?: VoucherUpsertWithoutClaimedVouchersInput
    connect?: VoucherWhereUniqueInput
    update?: XOR<XOR<VoucherUpdateToOneWithWhereWithoutClaimedVouchersInput, VoucherUpdateWithoutClaimedVouchersInput>, VoucherUncheckedUpdateWithoutClaimedVouchersInput>
  }

  export type UserUpdateOneRequiredWithoutClaimedVouchersNestedInput = {
    create?: XOR<UserCreateWithoutClaimedVouchersInput, UserUncheckedCreateWithoutClaimedVouchersInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimedVouchersInput
    upsert?: UserUpsertWithoutClaimedVouchersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimedVouchersInput, UserUpdateWithoutClaimedVouchersInput>, UserUncheckedUpdateWithoutClaimedVouchersInput>
  }

  export type UserCreateNestedOneWithoutChatLogsInput = {
    create?: XOR<UserCreateWithoutChatLogsInput, UserUncheckedCreateWithoutChatLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatLogsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketCreateNestedOneWithoutChatLogsInput = {
    create?: XOR<TicketCreateWithoutChatLogsInput, TicketUncheckedCreateWithoutChatLogsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutChatLogsInput
    connect?: TicketWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChatLogsNestedInput = {
    create?: XOR<UserCreateWithoutChatLogsInput, UserUncheckedCreateWithoutChatLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatLogsInput
    upsert?: UserUpsertWithoutChatLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatLogsInput, UserUpdateWithoutChatLogsInput>, UserUncheckedUpdateWithoutChatLogsInput>
  }

  export type TicketUpdateOneWithoutChatLogsNestedInput = {
    create?: XOR<TicketCreateWithoutChatLogsInput, TicketUncheckedCreateWithoutChatLogsInput>
    connectOrCreate?: TicketCreateOrConnectWithoutChatLogsInput
    upsert?: TicketUpsertWithoutChatLogsInput
    disconnect?: TicketWhereInput | boolean
    delete?: TicketWhereInput | boolean
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutChatLogsInput, TicketUpdateWithoutChatLogsInput>, TicketUncheckedUpdateWithoutChatLogsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumCustomerSegmentFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerSegment | EnumCustomerSegmentFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerSegmentFilter<$PrismaModel> | $Enums.CustomerSegment
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCustomerSegmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CustomerSegment | EnumCustomerSegmentFieldRefInput<$PrismaModel>
    in?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.CustomerSegment[] | ListEnumCustomerSegmentFieldRefInput<$PrismaModel>
    not?: NestedEnumCustomerSegmentWithAggregatesFilter<$PrismaModel> | $Enums.CustomerSegment
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCustomerSegmentFilter<$PrismaModel>
    _max?: NestedEnumCustomerSegmentFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type NestedEnumTicketChannelFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketChannel | EnumTicketChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketChannelFilter<$PrismaModel> | $Enums.TicketChannel
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type NestedEnumTicketChannelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketChannel | EnumTicketChannelFieldRefInput<$PrismaModel>
    in?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketChannel[] | ListEnumTicketChannelFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketChannelWithAggregatesFilter<$PrismaModel> | $Enums.TicketChannel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketChannelFilter<$PrismaModel>
    _max?: NestedEnumTicketChannelFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type CustomerCreateWithoutUserInput = {
    phone?: string | null
    address?: string | null
    company?: string | null
    segment?: $Enums.CustomerSegment
    source?: string | null
    createdAt?: Date | string
  }

  export type CustomerUncheckedCreateWithoutUserInput = {
    id?: number
    phone?: string | null
    address?: string | null
    company?: string | null
    segment?: $Enums.CustomerSegment
    source?: string | null
    createdAt?: Date | string
  }

  export type CustomerCreateOrConnectWithoutUserInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
  }

  export type TicketCreateWithoutAgentInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    feedback?: FeedbackCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutAgentInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    feedback?: FeedbackUncheckedCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutAgentInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput>
  }

  export type TicketCreateManyAgentInputEnvelope = {
    data: TicketCreateManyAgentInput | TicketCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type TicketMessageCreateWithoutSenderInput = {
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutMessagesInput
  }

  export type TicketMessageUncheckedCreateWithoutSenderInput = {
    id?: number
    ticketId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageCreateOrConnectWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    create: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput>
  }

  export type TicketMessageCreateManySenderInputEnvelope = {
    data: TicketMessageCreateManySenderInput | TicketMessageCreateManySenderInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutCustomerInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    ticket: TicketCreateNestedOneWithoutFeedbackInput
  }

  export type FeedbackUncheckedCreateWithoutCustomerInput = {
    id?: number
    ticketId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutCustomerInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput>
  }

  export type FeedbackCreateManyCustomerInputEnvelope = {
    data: FeedbackCreateManyCustomerInput | FeedbackCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ClaimedVoucherCreateWithoutUserInput = {
    claimedAt?: Date | string
    voucher: VoucherCreateNestedOneWithoutClaimedVouchersInput
  }

  export type ClaimedVoucherUncheckedCreateWithoutUserInput = {
    id?: number
    voucherId: number
    claimedAt?: Date | string
  }

  export type ClaimedVoucherCreateOrConnectWithoutUserInput = {
    where: ClaimedVoucherWhereUniqueInput
    create: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput>
  }

  export type ClaimedVoucherCreateManyUserInputEnvelope = {
    data: ClaimedVoucherCreateManyUserInput | ClaimedVoucherCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChatLogCreateWithoutUserInput = {
    message: string
    response: string
    isResolved?: boolean
    createdAt?: Date | string
    ticket?: TicketCreateNestedOneWithoutChatLogsInput
  }

  export type ChatLogUncheckedCreateWithoutUserInput = {
    id?: number
    message: string
    response: string
    isResolved?: boolean
    ticketId?: number | null
    createdAt?: Date | string
  }

  export type ChatLogCreateOrConnectWithoutUserInput = {
    where: ChatLogWhereUniqueInput
    create: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput>
  }

  export type ChatLogCreateManyUserInputEnvelope = {
    data: ChatLogCreateManyUserInput | ChatLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutCustomerInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    agent?: UserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    feedback?: FeedbackCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutCustomerInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    feedback?: FeedbackUncheckedCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutCustomerInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput>
  }

  export type TicketCreateManyCustomerInputEnvelope = {
    data: TicketCreateManyCustomerInput | TicketCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutUserInput = {
    update: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
    create: XOR<CustomerCreateWithoutUserInput, CustomerUncheckedCreateWithoutUserInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutUserInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutUserInput, CustomerUncheckedUpdateWithoutUserInput>
  }

  export type CustomerUpdateWithoutUserInput = {
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    segment?: EnumCustomerSegmentFieldUpdateOperationsInput | $Enums.CustomerSegment
    source?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutAgentInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutAgentInput, TicketUncheckedUpdateWithoutAgentInput>
    create: XOR<TicketCreateWithoutAgentInput, TicketUncheckedCreateWithoutAgentInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutAgentInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutAgentInput, TicketUncheckedUpdateWithoutAgentInput>
  }

  export type TicketUpdateManyWithWhereWithoutAgentInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutAgentInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: IntFilter<"Ticket"> | number
    ticketNumber?: StringFilter<"Ticket"> | string
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    priority?: EnumTicketPriorityFilter<"Ticket"> | $Enums.TicketPriority
    channel?: EnumTicketChannelFilter<"Ticket"> | $Enums.TicketChannel
    customerId?: IntFilter<"Ticket"> | number
    assignedTo?: IntNullableFilter<"Ticket"> | number | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
  }

  export type TicketMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    update: XOR<TicketMessageUpdateWithoutSenderInput, TicketMessageUncheckedUpdateWithoutSenderInput>
    create: XOR<TicketMessageCreateWithoutSenderInput, TicketMessageUncheckedCreateWithoutSenderInput>
  }

  export type TicketMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: TicketMessageWhereUniqueInput
    data: XOR<TicketMessageUpdateWithoutSenderInput, TicketMessageUncheckedUpdateWithoutSenderInput>
  }

  export type TicketMessageUpdateManyWithWhereWithoutSenderInput = {
    where: TicketMessageScalarWhereInput
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type TicketMessageScalarWhereInput = {
    AND?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
    OR?: TicketMessageScalarWhereInput[]
    NOT?: TicketMessageScalarWhereInput | TicketMessageScalarWhereInput[]
    id?: IntFilter<"TicketMessage"> | number
    ticketId?: IntFilter<"TicketMessage"> | number
    senderId?: IntFilter<"TicketMessage"> | number
    senderRole?: StringFilter<"TicketMessage"> | string
    message?: StringFilter<"TicketMessage"> | string
    isInternal?: BoolFilter<"TicketMessage"> | boolean
    createdAt?: DateTimeFilter<"TicketMessage"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutCustomerInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutCustomerInput, FeedbackUncheckedUpdateWithoutCustomerInput>
    create: XOR<FeedbackCreateWithoutCustomerInput, FeedbackUncheckedCreateWithoutCustomerInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutCustomerInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutCustomerInput, FeedbackUncheckedUpdateWithoutCustomerInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutCustomerInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutCustomerInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: IntFilter<"Feedback"> | number
    ticketId?: IntFilter<"Feedback"> | number
    customerId?: IntFilter<"Feedback"> | number
    rating?: IntFilter<"Feedback"> | number
    comment?: StringNullableFilter<"Feedback"> | string | null
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type ClaimedVoucherUpsertWithWhereUniqueWithoutUserInput = {
    where: ClaimedVoucherWhereUniqueInput
    update: XOR<ClaimedVoucherUpdateWithoutUserInput, ClaimedVoucherUncheckedUpdateWithoutUserInput>
    create: XOR<ClaimedVoucherCreateWithoutUserInput, ClaimedVoucherUncheckedCreateWithoutUserInput>
  }

  export type ClaimedVoucherUpdateWithWhereUniqueWithoutUserInput = {
    where: ClaimedVoucherWhereUniqueInput
    data: XOR<ClaimedVoucherUpdateWithoutUserInput, ClaimedVoucherUncheckedUpdateWithoutUserInput>
  }

  export type ClaimedVoucherUpdateManyWithWhereWithoutUserInput = {
    where: ClaimedVoucherScalarWhereInput
    data: XOR<ClaimedVoucherUpdateManyMutationInput, ClaimedVoucherUncheckedUpdateManyWithoutUserInput>
  }

  export type ClaimedVoucherScalarWhereInput = {
    AND?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
    OR?: ClaimedVoucherScalarWhereInput[]
    NOT?: ClaimedVoucherScalarWhereInput | ClaimedVoucherScalarWhereInput[]
    id?: IntFilter<"ClaimedVoucher"> | number
    voucherId?: IntFilter<"ClaimedVoucher"> | number
    userId?: IntFilter<"ClaimedVoucher"> | number
    claimedAt?: DateTimeFilter<"ClaimedVoucher"> | Date | string
  }

  export type ChatLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatLogWhereUniqueInput
    update: XOR<ChatLogUpdateWithoutUserInput, ChatLogUncheckedUpdateWithoutUserInput>
    create: XOR<ChatLogCreateWithoutUserInput, ChatLogUncheckedCreateWithoutUserInput>
  }

  export type ChatLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatLogWhereUniqueInput
    data: XOR<ChatLogUpdateWithoutUserInput, ChatLogUncheckedUpdateWithoutUserInput>
  }

  export type ChatLogUpdateManyWithWhereWithoutUserInput = {
    where: ChatLogScalarWhereInput
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ChatLogScalarWhereInput = {
    AND?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
    OR?: ChatLogScalarWhereInput[]
    NOT?: ChatLogScalarWhereInput | ChatLogScalarWhereInput[]
    id?: IntFilter<"ChatLog"> | number
    userId?: IntFilter<"ChatLog"> | number
    message?: StringFilter<"ChatLog"> | string
    response?: StringFilter<"ChatLog"> | string
    isResolved?: BoolFilter<"ChatLog"> | boolean
    ticketId?: IntNullableFilter<"ChatLog"> | number | null
    createdAt?: DateTimeFilter<"ChatLog"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutCustomerInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutCustomerInput, TicketUncheckedUpdateWithoutCustomerInput>
    create: XOR<TicketCreateWithoutCustomerInput, TicketUncheckedCreateWithoutCustomerInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutCustomerInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutCustomerInput, TicketUncheckedUpdateWithoutCustomerInput>
  }

  export type TicketUpdateManyWithWhereWithoutCustomerInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutCustomerInput>
  }

  export type UserCreateWithoutCustomerInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutCustomerInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutCustomerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
  }

  export type UserUpsertWithoutCustomerInput = {
    update: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
    create: XOR<UserCreateWithoutCustomerInput, UserUncheckedCreateWithoutCustomerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomerInput, UserUncheckedUpdateWithoutCustomerInput>
  }

  export type UserUpdateWithoutCustomerInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateWithoutTicketsInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketsInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
  }

  export type UserCreateWithoutAssignedTicketsInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutAssignedTicketsInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutAssignedTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedTicketsInput, UserUncheckedCreateWithoutAssignedTicketsInput>
  }

  export type TicketMessageCreateWithoutTicketInput = {
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type TicketMessageUncheckedCreateWithoutTicketInput = {
    id?: number
    senderId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageCreateOrConnectWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    create: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput>
  }

  export type TicketMessageCreateManyTicketInputEnvelope = {
    data: TicketMessageCreateManyTicketInput | TicketMessageCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutTicketInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    customer: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutTicketInput = {
    id?: number
    customerId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutTicketInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
  }

  export type ChatLogCreateWithoutTicketInput = {
    message: string
    response: string
    isResolved?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutChatLogsInput
  }

  export type ChatLogUncheckedCreateWithoutTicketInput = {
    id?: number
    userId: number
    message: string
    response: string
    isResolved?: boolean
    createdAt?: Date | string
  }

  export type ChatLogCreateOrConnectWithoutTicketInput = {
    where: ChatLogWhereUniqueInput
    create: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput>
  }

  export type ChatLogCreateManyTicketInputEnvelope = {
    data: ChatLogCreateManyTicketInput | ChatLogCreateManyTicketInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTicketsInput = {
    update: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
    create: XOR<UserCreateWithoutTicketsInput, UserUncheckedCreateWithoutTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketsInput, UserUncheckedUpdateWithoutTicketsInput>
  }

  export type UserUpdateWithoutTicketsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAssignedTicketsInput = {
    update: XOR<UserUpdateWithoutAssignedTicketsInput, UserUncheckedUpdateWithoutAssignedTicketsInput>
    create: XOR<UserCreateWithoutAssignedTicketsInput, UserUncheckedCreateWithoutAssignedTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedTicketsInput, UserUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type UserUpdateWithoutAssignedTicketsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TicketMessageUpsertWithWhereUniqueWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    update: XOR<TicketMessageUpdateWithoutTicketInput, TicketMessageUncheckedUpdateWithoutTicketInput>
    create: XOR<TicketMessageCreateWithoutTicketInput, TicketMessageUncheckedCreateWithoutTicketInput>
  }

  export type TicketMessageUpdateWithWhereUniqueWithoutTicketInput = {
    where: TicketMessageWhereUniqueInput
    data: XOR<TicketMessageUpdateWithoutTicketInput, TicketMessageUncheckedUpdateWithoutTicketInput>
  }

  export type TicketMessageUpdateManyWithWhereWithoutTicketInput = {
    where: TicketMessageScalarWhereInput
    data: XOR<TicketMessageUpdateManyMutationInput, TicketMessageUncheckedUpdateManyWithoutTicketInput>
  }

  export type FeedbackUpsertWithoutTicketInput = {
    update: XOR<FeedbackUpdateWithoutTicketInput, FeedbackUncheckedUpdateWithoutTicketInput>
    create: XOR<FeedbackCreateWithoutTicketInput, FeedbackUncheckedCreateWithoutTicketInput>
    where?: FeedbackWhereInput
  }

  export type FeedbackUpdateToOneWithWhereWithoutTicketInput = {
    where?: FeedbackWhereInput
    data: XOR<FeedbackUpdateWithoutTicketInput, FeedbackUncheckedUpdateWithoutTicketInput>
  }

  export type FeedbackUpdateWithoutTicketInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUpsertWithWhereUniqueWithoutTicketInput = {
    where: ChatLogWhereUniqueInput
    update: XOR<ChatLogUpdateWithoutTicketInput, ChatLogUncheckedUpdateWithoutTicketInput>
    create: XOR<ChatLogCreateWithoutTicketInput, ChatLogUncheckedCreateWithoutTicketInput>
  }

  export type ChatLogUpdateWithWhereUniqueWithoutTicketInput = {
    where: ChatLogWhereUniqueInput
    data: XOR<ChatLogUpdateWithoutTicketInput, ChatLogUncheckedUpdateWithoutTicketInput>
  }

  export type ChatLogUpdateManyWithWhereWithoutTicketInput = {
    where: ChatLogScalarWhereInput
    data: XOR<ChatLogUpdateManyMutationInput, ChatLogUncheckedUpdateManyWithoutTicketInput>
  }

  export type TicketCreateWithoutMessagesInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutTicketsInput
    agent?: UserCreateNestedOneWithoutAssignedTicketsInput
    feedback?: FeedbackCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutMessagesInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    feedback?: FeedbackUncheckedCreateNestedOneWithoutTicketInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutMessagesInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutMessagesInput, TicketUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type TicketUpsertWithoutMessagesInput = {
    update: XOR<TicketUpdateWithoutMessagesInput, TicketUncheckedUpdateWithoutMessagesInput>
    create: XOR<TicketCreateWithoutMessagesInput, TicketUncheckedCreateWithoutMessagesInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutMessagesInput, TicketUncheckedUpdateWithoutMessagesInput>
  }

  export type TicketUpdateWithoutMessagesInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutTicketsNestedInput
    agent?: UserUpdateOneWithoutAssignedTicketsNestedInput
    feedback?: FeedbackUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    feedback?: FeedbackUncheckedUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TicketCreateWithoutFeedbackInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutTicketsInput
    agent?: UserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    chatLogs?: ChatLogCreateNestedManyWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutFeedbackInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutFeedbackInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutFeedbackInput, TicketUncheckedCreateWithoutFeedbackInput>
  }

  export type UserCreateWithoutFeedbacksInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutFeedbacksInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutFeedbacksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
  }

  export type TicketUpsertWithoutFeedbackInput = {
    update: XOR<TicketUpdateWithoutFeedbackInput, TicketUncheckedUpdateWithoutFeedbackInput>
    create: XOR<TicketCreateWithoutFeedbackInput, TicketUncheckedCreateWithoutFeedbackInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutFeedbackInput, TicketUncheckedUpdateWithoutFeedbackInput>
  }

  export type TicketUpdateWithoutFeedbackInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutTicketsNestedInput
    agent?: UserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    chatLogs?: ChatLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutFeedbackInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type UserUpsertWithoutFeedbacksInput = {
    update: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateWithoutFeedbacksInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type ClaimedVoucherCreateWithoutVoucherInput = {
    claimedAt?: Date | string
    user: UserCreateNestedOneWithoutClaimedVouchersInput
  }

  export type ClaimedVoucherUncheckedCreateWithoutVoucherInput = {
    id?: number
    userId: number
    claimedAt?: Date | string
  }

  export type ClaimedVoucherCreateOrConnectWithoutVoucherInput = {
    where: ClaimedVoucherWhereUniqueInput
    create: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput>
  }

  export type ClaimedVoucherCreateManyVoucherInputEnvelope = {
    data: ClaimedVoucherCreateManyVoucherInput | ClaimedVoucherCreateManyVoucherInput[]
    skipDuplicates?: boolean
  }

  export type ClaimedVoucherUpsertWithWhereUniqueWithoutVoucherInput = {
    where: ClaimedVoucherWhereUniqueInput
    update: XOR<ClaimedVoucherUpdateWithoutVoucherInput, ClaimedVoucherUncheckedUpdateWithoutVoucherInput>
    create: XOR<ClaimedVoucherCreateWithoutVoucherInput, ClaimedVoucherUncheckedCreateWithoutVoucherInput>
  }

  export type ClaimedVoucherUpdateWithWhereUniqueWithoutVoucherInput = {
    where: ClaimedVoucherWhereUniqueInput
    data: XOR<ClaimedVoucherUpdateWithoutVoucherInput, ClaimedVoucherUncheckedUpdateWithoutVoucherInput>
  }

  export type ClaimedVoucherUpdateManyWithWhereWithoutVoucherInput = {
    where: ClaimedVoucherScalarWhereInput
    data: XOR<ClaimedVoucherUpdateManyMutationInput, ClaimedVoucherUncheckedUpdateManyWithoutVoucherInput>
  }

  export type VoucherCreateWithoutClaimedVouchersInput = {
    code: string
    title: string
    description?: string | null
    discount: number
    validUntil: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type VoucherUncheckedCreateWithoutClaimedVouchersInput = {
    id?: number
    code: string
    title: string
    description?: string | null
    discount: number
    validUntil: Date | string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type VoucherCreateOrConnectWithoutClaimedVouchersInput = {
    where: VoucherWhereUniqueInput
    create: XOR<VoucherCreateWithoutClaimedVouchersInput, VoucherUncheckedCreateWithoutClaimedVouchersInput>
  }

  export type UserCreateWithoutClaimedVouchersInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutClaimedVouchersInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutClaimedVouchersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimedVouchersInput, UserUncheckedCreateWithoutClaimedVouchersInput>
  }

  export type VoucherUpsertWithoutClaimedVouchersInput = {
    update: XOR<VoucherUpdateWithoutClaimedVouchersInput, VoucherUncheckedUpdateWithoutClaimedVouchersInput>
    create: XOR<VoucherCreateWithoutClaimedVouchersInput, VoucherUncheckedCreateWithoutClaimedVouchersInput>
    where?: VoucherWhereInput
  }

  export type VoucherUpdateToOneWithWhereWithoutClaimedVouchersInput = {
    where?: VoucherWhereInput
    data: XOR<VoucherUpdateWithoutClaimedVouchersInput, VoucherUncheckedUpdateWithoutClaimedVouchersInput>
  }

  export type VoucherUpdateWithoutClaimedVouchersInput = {
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoucherUncheckedUpdateWithoutClaimedVouchersInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    discount?: IntFieldUpdateOperationsInput | number
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutClaimedVouchersInput = {
    update: XOR<UserUpdateWithoutClaimedVouchersInput, UserUncheckedUpdateWithoutClaimedVouchersInput>
    create: XOR<UserCreateWithoutClaimedVouchersInput, UserUncheckedCreateWithoutClaimedVouchersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimedVouchersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimedVouchersInput, UserUncheckedUpdateWithoutClaimedVouchersInput>
  }

  export type UserUpdateWithoutClaimedVouchersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimedVouchersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateWithoutChatLogsInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutChatLogsInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutChatLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatLogsInput, UserUncheckedCreateWithoutChatLogsInput>
  }

  export type TicketCreateWithoutChatLogsInput = {
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutTicketsInput
    agent?: UserCreateNestedOneWithoutAssignedTicketsInput
    messages?: TicketMessageCreateNestedManyWithoutTicketInput
    feedback?: FeedbackCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutChatLogsInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
    messages?: TicketMessageUncheckedCreateNestedManyWithoutTicketInput
    feedback?: FeedbackUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutChatLogsInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutChatLogsInput, TicketUncheckedCreateWithoutChatLogsInput>
  }

  export type UserUpsertWithoutChatLogsInput = {
    update: XOR<UserUpdateWithoutChatLogsInput, UserUncheckedUpdateWithoutChatLogsInput>
    create: XOR<UserCreateWithoutChatLogsInput, UserUncheckedCreateWithoutChatLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatLogsInput, UserUncheckedUpdateWithoutChatLogsInput>
  }

  export type UserUpdateWithoutChatLogsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutChatLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TicketUpsertWithoutChatLogsInput = {
    update: XOR<TicketUpdateWithoutChatLogsInput, TicketUncheckedUpdateWithoutChatLogsInput>
    create: XOR<TicketCreateWithoutChatLogsInput, TicketUncheckedCreateWithoutChatLogsInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutChatLogsInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutChatLogsInput, TicketUncheckedUpdateWithoutChatLogsInput>
  }

  export type TicketUpdateWithoutChatLogsInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutTicketsNestedInput
    agent?: UserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutChatLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerCreateNestedOneWithoutUserInput
    assignedTickets?: TicketCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogCreateNestedManyWithoutUserInput
    tickets?: TicketCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    customer?: CustomerUncheckedCreateNestedOneWithoutUserInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAgentInput
    sentMessages?: TicketMessageUncheckedCreateNestedManyWithoutSenderInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutCustomerInput
    claimedVouchers?: ClaimedVoucherUncheckedCreateNestedManyWithoutUserInput
    chatLogs?: ChatLogUncheckedCreateNestedManyWithoutUserInput
    tickets?: TicketUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUpdateManyWithoutUserNestedInput
    tickets?: TicketUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUncheckedUpdateOneWithoutUserNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAgentNestedInput
    sentMessages?: TicketMessageUncheckedUpdateManyWithoutSenderNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutCustomerNestedInput
    claimedVouchers?: ClaimedVoucherUncheckedUpdateManyWithoutUserNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutUserNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type TicketCreateManyAgentInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    customerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type TicketMessageCreateManySenderInput = {
    id?: number
    ticketId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type FeedbackCreateManyCustomerInput = {
    id?: number
    ticketId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type ClaimedVoucherCreateManyUserInput = {
    id?: number
    voucherId: number
    claimedAt?: Date | string
  }

  export type ChatLogCreateManyUserInput = {
    id?: number
    message: string
    response: string
    isResolved?: boolean
    ticketId?: number | null
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    title: string
    message: string
    isRead?: boolean
    type?: $Enums.NotificationType
    createdAt?: Date | string
  }

  export type TicketCreateManyCustomerInput = {
    id?: number
    ticketNumber: string
    title: string
    description: string
    status?: $Enums.TicketStatus
    priority?: $Enums.TicketPriority
    channel?: $Enums.TicketChannel
    assignedTo?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type TicketUpdateWithoutAgentInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUncheckedUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    customerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketMessageUpdateWithoutSenderInput = {
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutCustomerInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherUpdateWithoutUserInput = {
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voucher?: VoucherUpdateOneRequiredWithoutClaimedVouchersNestedInput
  }

  export type ClaimedVoucherUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    voucherId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    voucherId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUpdateWithoutUserInput = {
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: TicketUpdateOneWithoutChatLogsNestedInput
  }

  export type ChatLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    ticketId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    ticketId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutCustomerInput = {
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: UserUpdateOneWithoutAssignedTicketsNestedInput
    messages?: TicketMessageUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    messages?: TicketMessageUncheckedUpdateManyWithoutTicketNestedInput
    feedback?: FeedbackUncheckedUpdateOneWithoutTicketNestedInput
    chatLogs?: ChatLogUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketNumber?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    channel?: EnumTicketChannelFieldUpdateOperationsInput | $Enums.TicketChannel
    assignedTo?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TicketMessageCreateManyTicketInput = {
    id?: number
    senderId: number
    senderRole: string
    message: string
    isInternal?: boolean
    createdAt?: Date | string
  }

  export type ChatLogCreateManyTicketInput = {
    id?: number
    userId: number
    message: string
    response: string
    isResolved?: boolean
    createdAt?: Date | string
  }

  export type TicketMessageUpdateWithoutTicketInput = {
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type TicketMessageUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketMessageUncheckedUpdateManyWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    senderId?: IntFieldUpdateOperationsInput | number
    senderRole?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isInternal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUpdateWithoutTicketInput = {
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChatLogsNestedInput
  }

  export type ChatLogUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatLogUncheckedUpdateManyWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    message?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    isResolved?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherCreateManyVoucherInput = {
    id?: number
    userId: number
    claimedAt?: Date | string
  }

  export type ClaimedVoucherUpdateWithoutVoucherInput = {
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClaimedVouchersNestedInput
  }

  export type ClaimedVoucherUncheckedUpdateWithoutVoucherInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimedVoucherUncheckedUpdateManyWithoutVoucherInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    claimedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}