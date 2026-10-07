---
"@gb-transit/gtfs": minor
"@gb-transit/gtfs-schema": minor
"@gb-transit/gtfs-loader": patch
"@gb-transit/dtd-source": minor
"dtd2mysql": minor
"cif2gtfs": minor
---

Publish each train's traction in `trips.txt`: `power_type`, `timing_load` and `max_speed`, from the
BS record's power type, timing load and speed (columns 51-60).

The power type is the CIF code as written - `D`, `DEM`, `DMU`, `E`, `ED`, `EML`, `EMU` or `HST`. The
timing load reads by it: the class of unit for a multiple unit (`EMU` `387` is a Class 387), a
trailing load in tonnes behind a locomotive. `max_speed` is in mph, as a number, so `080` is `80`.

All three are producer extensions, written after `headcode` and before `shape_id`, and empty where
the record leaves them blank. Like the headcode, they are what the train starts with: a CR record
changing the traction part way along a journey is not followed.

`Schedule` gains a `traction`, exported as the `Traction` type, and `ScheduleStopTimeRow` gains
`power_type`, `timing_load` and `speed`. `dtd2mysql --gtfs-import` loads the columns into `trips`.
