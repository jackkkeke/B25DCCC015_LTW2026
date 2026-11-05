import React from 'react';

export const Helpers = ({ helpers, onUseHelper, status }) => {
  const isDisabled = status !== 'answering';

  return (
    <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
      <button
        onClick={() => onUseHelper('removeWrong')}
        disabled={isDisabled || helpers.removeWrong}
        style={{ padding: '8px 12px' }}
      >
        Loại 1 đáp án {helpers.removeWrong && '(Đã dùng)'}
      </button>
      <button
        onClick={() => onUseHelper('addTime')}
        disabled={isDisabled || helpers.addTime}
        style={{ padding: '8px 12px' }}
      >
        Thêm 15 giây {helpers.addTime && '(Đã dùng)'}
      </button>
      <button
        onClick={() => onUseHelper('lifejacket')}
        disabled={isDisabled || helpers.lifejacket}
        style={{ padding: '8px 12px', backgroundColor: helpers.lifejacketActive ? '#ffc107' : '' }}
      >
        {helpers.lifejacketActive ? 'Phao đang bật' : 'Phao cứu sinh'} {helpers.lifejacket && !helpers.lifejacketActive && '(Đã dùng)'}
      </button>
    </div>
  );
};