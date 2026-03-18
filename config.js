// Environment configuration for OJT DTR System
// Copy this file to .env and update with your actual credentials

// Supabase Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://edtwmxadfqhmmilucvol.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdHdteGFkZnFobW1pbHVjdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDExMjAsImV4cCI6MjA4OTM3NzEyMH0.ssNIJ6CoobfUo6FpEqF2vMIw5H427eMY5xhqH4GPMDo';

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_URL, SUPABASE_ANON_KEY };
}
