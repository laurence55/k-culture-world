/**
 * This script helps you update your Firebase configuration with a valid API key.
 * 
 * To use this script:
 * 1. Run: node update-firebase-config.js
 * 2. Follow the prompts to enter your Firebase API key and other configuration values.
 * 3. The script will update your .env file with the new values.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to the .env file
const envPath = path.join(__dirname, '.env');

// Read the current .env file
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.error('Error reading .env file:', error);
  process.exit(1);
}

// Function to update the .env file with new values
function updateEnvFile(key, value) {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    envContent += `\n${key}=${value}`;
  }
}

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function main() {
  console.log('=== Firebase Configuration Update ===');
  console.log('This script will help you update your Firebase configuration with a valid API key.');
  console.log('You can find your Firebase configuration in the Firebase Console:');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Select your project "kcultureworld"');
  console.log('3. Click on the gear icon (⚙️) next to "Project Overview"');
  console.log('4. Select "Project settings"');
  console.log('5. Scroll down to "Your apps" section');
  console.log('6. Find your web app configuration');
  console.log('7. Copy the configuration values');
  console.log('');

  // Prompt for API key
  const apiKey = await prompt('Enter your Firebase API key: ');
  if (apiKey) {
    updateEnvFile('VITE_FIREBASE_API_KEY', apiKey);
  }

  // Prompt for auth domain
  const authDomain = await prompt('Enter your Firebase Auth Domain (leave empty to keep current): ');
  if (authDomain) {
    updateEnvFile('VITE_FIREBASE_AUTH_DOMAIN', authDomain);
  }

  // Prompt for project ID
  const projectId = await prompt('Enter your Firebase Project ID (leave empty to keep current): ');
  if (projectId) {
    updateEnvFile('VITE_FIREBASE_PROJECT_ID', projectId);
  }

  // Prompt for storage bucket
  const storageBucket = await prompt('Enter your Firebase Storage Bucket (leave empty to keep current): ');
  if (storageBucket) {
    updateEnvFile('VITE_FIREBASE_STORAGE_BUCKET', storageBucket);
  }

  // Prompt for messaging sender ID
  const messagingSenderId = await prompt('Enter your Firebase Messaging Sender ID (leave empty to keep current): ');
  if (messagingSenderId) {
    updateEnvFile('VITE_FIREBASE_MESSAGING_SENDER_ID', messagingSenderId);
  }

  // Prompt for app ID
  const appId = await prompt('Enter your Firebase App ID (leave empty to keep current): ');
  if (appId) {
    updateEnvFile('VITE_FIREBASE_APP_ID', appId);
  }

  // Write the updated .env file
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file updated successfully!');
    console.log('\nNext steps:');
    console.log('1. Restart your development server:');
    console.log('   cd k-culture-world');
    console.log('   npm run dev');
    console.log('2. Make sure Email/Password authentication is enabled in your Firebase Console:');
    console.log('   - Go to Authentication > Sign-in method');
    console.log('   - Enable Email/Password provider');
  } catch (error) {
    console.error('Error writing .env file:', error);
  }

  rl.close();
}

main(); 