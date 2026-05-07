# Database — MOVE

## Principe

De database slaat alleen op wat nodig is voor het leerproces:

> "Welke interventie werkt voor welk patroon bij welke gebruiker?"

Geen uitgebreide gebruikersprofielen. Geen psychologische analyses. Alleen de data die de adaptatie mogelijk maakt.

---

## Tabellen

### users

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | |

---

### messages

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key → users |
| content | TEXT | Ruwe gebruikersinput |
| created_at | TIMESTAMP | |

---

### patterns

Voorgedefinieerd. Niet dynamisch gegenereerd.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Zie interventions.md voor alle waarden |
| description | TEXT | |
| category | VARCHAR | cognitive, emotional, behavioral, somatic, existential |

---

### beliefs

Voorgedefinieerd. De volledige set core beliefs.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Zie psychology.md voor alle waarden |
| category | VARCHAR | worth, safety, connection, competence, responsibility, expression, permanence |
| acknowledgment_phrase | TEXT | De erkenningszin die getoond wordt |

---

### intervention_types

Voorgedefinieerd. De twaalf interventietypes.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | GROUND, BREATHE, MOVE, START, DECIDE, FEEL, RELEASE, WRITE, CONNECT, REST, SHIFT, WITNESS, MEANING |
| description | TEXT | |

---

### actions

Specifieke acties per interventie type. Meerdere per type.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| intervention_type_id | UUID | Foreign key → intervention_types |
| description | TEXT | De actie zoals getoond aan de gebruiker |

---

### pattern_belief_map

Standaard mapping patroon → belief. Gebruikt als er nog geen gebruikersdata is.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| pattern_id | UUID | Foreign key → patterns |
| belief_id | UUID | Foreign key → beliefs |
| is_primary | BOOLEAN | Primaire of secondaire belief |

---

### interventions

Kern-tabel. Elke sessie produceert één rij.

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key → users |
| message_id | UUID | Foreign key → messages |
| pattern_id | UUID | Gedetecteerd patroon |
| belief_id | UUID | Actieve belief |
| action_id | UUID | Gegeven actie |
| acknowledgment | TEXT | De erkenningszin die getoond is |
| created_at | TIMESTAMP | |

---

### feedback

| Kolom | Type | Omschrijving |
|-------|------|-------------|
| id | UUID | Primary key |
| intervention_id | UUID | Foreign key → interventions |
| helpful | BOOLEAN | Heeft het geholpen? |
| created_at | TIMESTAMP | |

---

## Leerlogica

Query die bepaalt welke actie gekozen wordt voor een gebruiker bij een bepaald patroon:

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
JOIN interventions i ON i.action_id = a.id
LEFT JOIN feedback f ON f.intervention_id = i.id
WHERE i.user_id = $1
  AND i.pattern_id = $2
GROUP BY a.id
ORDER BY success_rate DESC NULLS LAST
LIMIT 1;
```

Als er geen data is → gebruik `pattern_belief_map` + standaard interventie mapping uit `interventions.md`.

---

## Migraties

Volgorde:
1. `users`
2. `beliefs`
3. `patterns`
4. `intervention_types`
5. `actions`
6. `pattern_belief_map` (seed data)
7. `messages`
8. `interventions`
9. `feedback`
