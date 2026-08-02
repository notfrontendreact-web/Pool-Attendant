/*
# Create reservations table for pool service bookings

1. New Tables
- `reservations`
- `id` (uuid, primary key)
- `name` (text, customer full name)
- `phone` (text, customer phone number)
- `email` (text, optional customer email)
- `service_type` (text, type of service: cleaning, repair, maintenance, installation, consultation)
- `preferred_date` (date, requested appointment date)
- `preferred_time` (text, requested time slot)
- `address` (text, pool location address)
- `notes` (text, optional additional notes)
- `locale` (text, language used when booking: fa or en)
- `status` (text, booking status, defaults to 'pending')
- `created_at` (timestamptz, record creation time)

2. Security
- Enable RLS on `reservations`.
- Allow anon + authenticated to insert (public booking form, no sign-in required).
- Allow anon + authenticated to select (so users can see their own bookings by phone if needed).
- No update or delete from the frontend; bookings are managed server-side.
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service_type text NOT NULL DEFAULT 'cleaning',
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  address text NOT NULL,
  notes text,
  locale text NOT NULL DEFAULT 'fa',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);
