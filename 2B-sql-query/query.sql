-- This query retrieves the name and phone numbers for each person in the `people` table.
SELECT
  -- Combine the first and last names to create a full name for each person.
  CONCAT(p.first_name, ' ', p.last_name) AS name,

  -- Concatenate all of the phone numbers for each person into a single string,
  -- separated by commas. If a person has no phone numbers, use the string "N/A".
  COALESCE(
    STRING_AGG(ph.number, ',' ORDER BY ph.number),
    'N/A'
  ) AS numbers

FROM
  -- The `people` table contains information about each person.
  people p

LEFT JOIN
  -- The `phones` table contains information about each person's phone numbers.
  phones ph

ON
  -- Join the `people` and `phones` tables on the `user_id` column.
  p.id = ph.user_id

GROUP BY
  -- Group the results by the `id`, `first_name`, and `last_name` columns of the `people` table.
  p.id,
  p.first_name,
  p.last_name

ORDER BY
  -- Sort the results by the `last_name` and `first_name` columns of the `people` table.
  p.last_name,
  p.first_name;
