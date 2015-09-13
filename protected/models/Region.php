<?php

/**
 * Created by PhpStorm.
 * User: ivan
 * Date: 12.09.15
 * Time: 17:23
 */
class Region extends CActiveRecord
{
    /**
     * @param string $classname
     * @return static
     */
    public static function model($classname=__CLASS__)
    {
        return parent::model($classname);
    }

    /**
     * @return string
     */
    public function tableName()
    {
        return 'region';
    }

    /**
     * @return array
     */
    public function relations()
    {
        return [
            'region_fk_to_country'=>[
                self::BELONGS_TO,
                'Country',
                'region_fk_to_country',
            ],
            'locality'=>[
                self::HAS_MANY,
                'Locality',
                'locality_fk_to_region',
            ],
        ];
    }
}