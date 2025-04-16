// models/User.js
import { DataTypes, Model, type CreationOptional, type ModelDefined, type Optional } from 'sequelize';
import sequelize from '../../../configs/db/db.sequelize'; // Import your Sequelize instance
import { emailEndsWith } from '../../../configs/constants/local.constants';
type UserCreationAttributes = Optional<Iuser, 'id'>;

class User extends Model<Iuser, UserCreationAttributes> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
}

const UserModel:
    ModelDefined<
        Iuser,
        UserCreationAttributes
    >
    = sequelize.define('User',
        {
            // Define your model attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                // autoIncrementIdentity: true,
            },
            name: {
                type: DataTypes.STRING(64),
            },
            email: {
                type: DataTypes.STRING(64),
                unique: true,
                validate: {
                    isEmail: true,
                    isEndwith: (value: string) => {
                        if (!emailEndsWith.some((val) => value.endsWith(val))) {
                            throw new Error("invalidEmailCategory");
                        }
                    },
                },
            },
            // address:{
            //     type:DataTypes.STRING
            // }
        },
    );

export default UserModel;