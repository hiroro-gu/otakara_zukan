import React from 'react'
import filed from '../../images/field.gif'
import template from '../../images/template.gif'
import image from '../../images/image.gif'
import tag from '../../images/tag.gif'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const HowToUse = () => {
  return (
    <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
      <SwiperSlide>
        <div className='how_to_use'>
          <h2>テキストボックス</h2>
          <p>入力フィールド追加を開き、フィールドを選択すると <br />
              作成画面に追加できます。</p>
          <p>ドラッグ&ドロップ、リサイズができます。</p>
          <p>×を押すと画面上から削除できます。</p>
          <img src={filed} alt='how_to_filed.gif'/>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='how_to_use'>
          <h2>テンプレート</h2>
          <p>テンプレート変更を開き、使用したいテンプレートを <br />
              選択するとテンプレートを変更できます。</p>
          <p>ドラッグ&ドロップ、リサイズができます。</p>
          <p>×を押すと画面上から削除できます。</p>
          <p>テンプレートにテキストボックスを追加することもできます。</p>
          <img src={template} alt='how_to_template.gif' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='how_to_use'>
          <h2>画像追加</h2>
          <p>カメラのアイコンをクリックしフォルダから <br />
              画像を追加できます。</p>
          <p>ドラッグ&ドロップができます。</p>
          <p>×を押すと画面上から削除できます。</p>
          <img src={image} alt='how_to_image.gif' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className='how_to_use'>
          <h2>タグの追加</h2>
          <p>画面下部のフィールドに入力後、 <br />
              Enterキーを押すとタグを追加できます。</p>
          <p>同じタグは１つまで使用できます。</p>
          <p>サジェストをクリックすると既存のタグを使用できます。</p>
          <img src={tag} alt='how_to_tag.gif' />
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
