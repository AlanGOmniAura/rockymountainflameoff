// scratch/test-qr.js
// Automated verification script for Labeled & Trackable QR Codes

async function runTests() {
  console.log('🚀 Starting QR Tracking API Tests...');
  const baseUrl = 'http://localhost:3005';

  try {
    // 1. Create QR Code A (Gold style, Test Poster label, buildapipe.com)
    console.log('\n--- Test 1: Creating QR Code A ("Test Poster A" for buildapipe.com) ---');
    const resA = await fetch(`${baseUrl}/api/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUrl: 'https://buildapipe.com',
        style: 'gold',
        label: 'Test Poster A'
      })
    });
    
    if (!resA.ok) throw new Error(`Failed to create QR Code A: ${resA.statusText}`);
    const dataA = await resA.json();
    console.log('✅ QR Code A Created Successfully!');
    console.log('   ID:', dataA.id);
    console.log('   Image API URL:', dataA.qrImageUrl);

    // 2. Create QR Code B (Glass style, Test Flyer label, same buildapipe.com link)
    console.log('\n--- Test 2: Creating QR Code B ("Test Flyer B" for same buildapipe.com link) ---');
    const resB = await fetch(`${baseUrl}/api/qr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetUrl: 'https://buildapipe.com',
        style: 'glass',
        label: 'Test Flyer B'
      })
    });

    if (!resB.ok) throw new Error(`Failed to create QR Code B: ${resB.statusText}`);
    const dataB = await resB.json();
    console.log('✅ QR Code B Created Successfully!');
    console.log('   ID:', dataB.id);
    console.log('   Image API URL:', dataB.qrImageUrl);

    if (dataA.id === dataB.id) {
      throw new Error('❌ Error: QR Codes A and B generated the same ID! They should be unique.');
    } else {
      console.log('✅ Success: QR Code IDs are distinct and independent.');
    }

    // 3. Fetch all active QR codes and verify both are listed with labels
    console.log('\n--- Test 3: Fetching All Active QR Codes ---');
    const resList = await fetch(`${baseUrl}/api/qr`);
    if (!resList.ok) throw new Error(`Failed to fetch QR codes list: ${resList.statusText}`);
    const dataList = await resList.json();
    
    const qrA = dataList.qrCodes.find(q => q.id === dataA.id);
    const qrB = dataList.qrCodes.find(q => q.id === dataB.id);

    if (qrA && qrB) {
      console.log('✅ Success: Both QR codes found in the list!');
      console.log(`   QR A Label: "${qrA.label}" | Clicks: ${qrA.click_count} | Target: ${qrA.target_url}`);
      console.log(`   QR B Label: "${qrB.label}" | Clicks: ${qrB.click_count} | Target: ${qrB.target_url}`);
    } else {
      throw new Error('❌ Error: Could not find both generated QR codes in active list.');
    }

    // 4. Simulate a user scanning QR Code A (hitting the redirect URL)
    console.log('\n--- Test 4: Simulating Scan of QR Code A (hitting /qr/[id]) ---');
    const redirectUrl = `${baseUrl}/qr/${dataA.id}`;
    console.log('   Scanning:', redirectUrl);
    
    // We fetch with redirect: 'manual' to check the redirect headers directly
    const resScan = await fetch(redirectUrl, { redirect: 'manual' });
    console.log('   Response Status:', resScan.status);
    console.log('   Response Headers Location:', resScan.headers.get('location'));

    if (resScan.status === 302 || resScan.status === 307) {
      const location = resScan.headers.get('location') || '';
      const normalizedLocation = location.replace(/\/$/, '');
      if (normalizedLocation === 'https://buildapipe.com') {
        console.log('✅ Success: Properly redirected to target URL!');
      } else {
        throw new Error(`❌ Error: Incorrect redirect destination: ${location}`);
      }
    } else {
      throw new Error(`❌ Error: Server did not issue a 302/307 redirect. Got status ${resScan.status}`);
    }

    // 5. Verify Click counts updated independently (A should have 1, B should still have 0)
    console.log('\n--- Test 5: Verifying Scan Counts Incremented Independently ---');
    const resVerify = await fetch(`${baseUrl}/api/qr`);
    const dataVerify = await resVerify.json();
    
    const verifiedA = dataVerify.qrCodes.find(q => q.id === dataA.id);
    const verifiedB = dataVerify.qrCodes.find(q => q.id === dataB.id);

    console.log(`   QR A ("${verifiedA.label}") Clicks: ${verifiedA.click_count} (Expected: 1)`);
    console.log(`   QR B ("${verifiedB.label}") Clicks: ${verifiedB.click_count} (Expected: 0)`);

    if (verifiedA.click_count === 1 && verifiedB.click_count === 0) {
      console.log('✅ Success: Click counts updated completely independently!');
    } else {
      throw new Error('❌ Error: Click counts are incorrect or did not update independently.');
    }

    // 6. Delete QR Code A to keep the database clean
    console.log('\n--- Test 6: Deleting QR Code A ---');
    const resDelete = await fetch(`${baseUrl}/api/qr?id=${dataA.id}`, { method: 'DELETE' });
    if (!resDelete.ok) throw new Error(`Failed to delete QR Code A: ${resDelete.statusText}`);
    console.log('✅ Success: QR Code A deleted successfully.');

    // 7. Verify deletion reflected in active list
    const resFinal = await fetch(`${baseUrl}/api/qr`);
    const dataFinal = await resFinal.json();
    const deletedFound = dataFinal.qrCodes.some(q => q.id === dataA.id);
    const remainingFound = dataFinal.qrCodes.some(q => q.id === dataB.id);

    if (!deletedFound && remainingFound) {
      console.log('✅ Success: Deletion reflected, only QR Code B remains.');
    } else {
      throw new Error('❌ Error: Deletion validation failed.');
    }

    // Clean up QR Code B too
    await fetch(`${baseUrl}/api/qr?id=${dataB.id}`, { method: 'DELETE' });

    console.log('\n🌟 ALL TESTS PASSED SUCCESSFULLY! 🌟');
  } catch (e) {
    console.error('\n❌ TEST SUITE FAILED:', e.message);
  }
}

runTests();
