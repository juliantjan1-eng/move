# Database — MOVE

## Principe

De database slaat alleen op wat nodig is voor het leerproces:

> "Welke interventie werkt voor welk patroon bij welke gebruiker?"

Geen uitgebreide gebruikersprofielen. Geen psychologische analyses. Alleen de data die de adaptatie mogelijk maakt.

## Tabellen

### users

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | Aanmaakdatum |

### messages

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key → users |
| content | TEXT | Ruwe gebruikersinput |
| created_at | TIMESTAMP | |

### patterns

Voorgedefinieerd. Niet dynamisch gegenereerd.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | overthinking, stuck, avoidance, checking, overwhelm, emotional_block |
| description | TEXT | |

### intervention_types

Voorgedefinieerd. De vijf types.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | GROUND, BREATHE, MOVE, START, DECIDE, FEEL |
| description | TEXT | |

### actions

Specifieke acties per interventie type.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| intervention_type_id | UUID | Foreign key → intervention_types |
| description | TEXT | De actie zoals getoond aan de gebruiker |

### interventions

Kern-tabel. Elke sessie produceert één rij.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key → users |
| message_id | UUID | Foreign key → messages |
| pattern_id | UUID | Gedetecteerd patroon |
| action_id | UUID | Gegeven actie |
| created_at | TIMESTAMP | |

### feedback

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| intervention_id | UUID | Foreign key → interventions |
| helpful | BOOLEAN | Heeft het geholpen? |
| created_at | TIMESTAMP | |

## Leerlogica

Query die bepaalt welke actie gekozen wordt:

```sql
SELECT
  a.id,
  a.description,
  COUNT(f.id) as total,
  SUM(CASE WHEN f.helpful = true THEN 1 ELSE 0 END) as successes,
  ROUND(
    SUM(CASE WHEN f.helpful = true THEN 1 ELSE 0 END)::numeric /
    NULLIF(COUNT(f.id), 0) * 100
  ) as success_rate
FROM actions a
JOIN intervention_types it ON a.intervention_type_id = it.id
JOIN interventions i ON i.action_id = a.id
LEFT JOIN feedback f ON f.intervention_id = i.id
WHERE i.user_id = $1
  AND i.pattern_id = $2
GROUP BY a.id
ORDER BY success_rate DESC NULLS LAST
LIMIT 1;
```

Als er geen data is → gebruik standaard mapping uit `interventions.md`.

## Migraties

Gebruik Supabase migraties of een simpele SQL init file.

Volgorde:
1. `users`
2. `patterns`
3. `intervention_types`
4. `actions`
5. `messages`
6. `interventions`
7. `feedback`
