import { totalPhoneBill } from '../bootcamp/totalPhoneBill.js';
import { strict as assert } from 'assert';

describe('The totalPhoneBill function', function () {
  it('should calculate the total for "call, sms, call" with plan "call 101"', async function () {
    const total = await totalPhoneBill('call 101', 'call, sms, call');
    assert.equal(total, '6.15');  
  });

  it('should calculate the total for "sms, sms, call" with plan "sms 101"', async function () {
    const total = await totalPhoneBill('sms 101', 'sms, sms, call');
    assert.equal(total, '3.00'); 
  });

  it('should return 0 for an empty string with plan "call 201"', async function () {
    const total = await totalPhoneBill('call 201', '');
    assert.equal(total, '0.00');
  });
});
