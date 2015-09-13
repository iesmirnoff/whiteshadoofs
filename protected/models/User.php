<?php

/**
 * Created by PhpStorm.
 * User: ivan
 * Date: 12.09.15
 * Time: 17:24
 */
class User extends CActiveRecord
{

    /**
     * @param string $className
     * @return static
     *
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className); // TODO: Change the autogenerated stub
    }

    /**
     * @return string Имя таблицы
     */
    public function tableName()
    {
        return 'user'; // TODO: Change the autogenerated stub
    }

    /**
     * @return array
     */
    public function relations()
    {
        return [
            'user_fk_to_role'=>[
                self::BELONGS_TO,
                'Role',
                'user_fk_to_role',
            ],
        ];
    }

}