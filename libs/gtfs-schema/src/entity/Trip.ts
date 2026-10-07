import {RSID, TUID} from "../model/Identifiers.js";

export interface Trip {
  route_id: string;
  /**
   * The service this trip runs to. A number in a feed this repository builds,
   * because createCalendar numbers them; whatever the producer used in a feed
   * read back from a file.
   */
  service_id: string | number;
  trip_id: string;
  trip_headsign: TUID;
  trip_short_name: RSID;
  direction_id: 0 | 1;
  wheelchair_accessible: 0 | 1 | 2;
  bikes_allowed: 0 | 1 | 2;
  /**
   * The vehicle block this trip belongs to - the trips a vehicle runs in
   * sequence, which a rider may stay aboard between.
   *
   * Optional because a rail feed has none: the DTD expresses the same idea as
   * an association, which becomes a transfer_type 4 rather than a block.
   */
  block_id?: string | null;
  /**
   * The train's headcode - the four character signalling ID such as 1A23 -
   * from the train identity of the CIF BS record.
   *
   * Not standard GTFS, which has no field for it: `trip_short_name` already
   * carries the retail service ID. Optional because only the rail feed has
   * one, and null on a trip whose schedule left it blank.
   */
  headcode?: string | null;
  /**
   * What hauls the train, from the BS record: the power type (D, E, ED, DMU,
   * EMU, HST...), the timing load and the maximum speed in mph.
   *
   * The timing load means what the power type says it means: the class of a
   * multiple unit (`387` on an EMU), a trailing load in tonnes behind a
   * locomotive. All three are producer extensions, like the headcode, and
   * null where the record leaves them blank.
   */
  power_type?: string | null;
  timing_load?: string | null;
  max_speed?: number | null;
  /**
   * The line this trip runs over, into shapes.txt.
   *
   * Optional because a feed need not draw one, and null on a trip whose stations
   * the feed cannot place - the rail feed writes shapes for every trip it can
   * and leaves this empty for the rest.
   */
  shape_id?: string | null;
}

/**
 * trips.txt, as it is written. Every field of Trip is a column of it.
 */
export type TripRow = Trip;
