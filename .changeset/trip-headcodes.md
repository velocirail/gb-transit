---
"@gb-transit/gtfs": minor
"@gb-transit/gtfs-schema": minor
"@gb-transit/gtfs-loader": patch
"@gb-transit/dtd-source": minor
"dtd2mysql": minor
"cif2gtfs": minor
---

Publish each train's headcode in `trips.txt`.

The headcode is the train identity of the CIF BS record (columns 33-36, such as `1A23`): what the
signaller and the crew call the train, where the retail service ID in `trip_short_name` is what it is
sold as. GTFS has no field for it, so it is a producer extension column, `headcode`, written just
before `shape_id`. A consumer that does not know the column ignores it.

It is read from both sources - the `schedule` and `z_schedule` tables, and the MCA and ZTR files -
and is empty where the record leaves the train identity blank, which most z-trains do. A CR record
can change a train's identity part way along its journey; the column holds the one it starts with.

`Schedule` gains a `headcode`, `ScheduleStopTimeRow` a `train_identity`, and `Trip` an optional
`headcode`. `dtd2mysql --gtfs-import` loads the column into `trips.headcode`.
