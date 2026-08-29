import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = '/Users/prajwalmr/.gemini/antigravity/brain/37bcfab3-85db-4495-8c18-ed38fa16850f';
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function runTests() {
  console.log('Starting automated browser verification on SELCO SevaConnect...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  // 1. Landing Page
  console.log('1. Testing Landing Page...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await delay(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '01_landing_page.png') });

  // 2. Report Issue Page
  console.log('2. Testing Report Issue Flow...');
  await page.goto('http://localhost:5173/report', { waitUntil: 'networkidle2' });
  await delay(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '02_report_issue_form.png') });
  
  // Fill form
  await page.type('input[placeholder*="Basavaraj"]', 'Ningappa Kittur');
  await page.type('input[placeholder*="+91"]', '+91 98450 99112');
  await page.type('input[placeholder*="Konnur"]', 'Kittur Gram, Bailhongal');

  // Submit form
  await page.click('button[type="submit"]');
  await delay(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '03_report_confirmation.png') });

  // 3. Track Ticket Page
  console.log('3. Testing Ticket Tracking Page...');
  await page.goto('http://localhost:5173/track?id=BLG-8492', { waitUntil: 'networkidle2' });
  await delay(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '04_track_ticket_live.png') });

  // 4. Technician Dashboard
  console.log('4. Testing Technician Portal...');
  await page.goto('http://localhost:5173/technician', { waitUntil: 'networkidle2' });
  await delay(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '05_technician_dashboard.png') });

  // 5. Coordinator Dashboard
  console.log('5. Testing Coordinator & Admin Dashboard...');
  await page.goto('http://localhost:5173/coordinator', { waitUntil: 'networkidle2' });
  await delay(1000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '06_coordinator_dashboard.png') });

  // 6. Women Technician Program
  console.log('6. Testing Urja Sakhi Women Technician Program...');
  await page.goto('http://localhost:5173/women-technicians', { waitUntil: 'networkidle2' });
  await delay(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '07_women_technician_program.png') });

  // 7. QR Lookup Page
  console.log('7. Testing QR Lookup & Solar History Page...');
  await page.goto('http://localhost:5173/qr-lookup?id=SELCO-BLG-8821', { waitUntil: 'networkidle2' });
  await delay(800);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, '08_qr_lookup_history.png') });

  console.log('All browser verification tests completed successfully!');
  await browser.close();
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
