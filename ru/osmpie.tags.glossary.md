# Глоссарий тегов и ключей OSM, использующихся в OSMPIE

Этот глоссарий охватывает большую часть тегов, используемых в коде для преобразования OSM-данных в детальную модель дорожной сети.


## 1. **Основные теги дорог (Highway)**
*   **`highway`**: Основной ключ для обозначения дорог и путей.
    *   `motorway`, `motorway_link`
    *   `trunk`, `trunk_link`
    *   `primary`, `primary_link`
    *   `secondary`, `secondary_link`
    *   `tertiary`, `tertiary_link`
*  и прочие значения:
    *   `residential`, `living_street`, `unclassified`, `service`, `pedestrian`, `footway`, `cycleway`, `construction`, `road` (устаревший, используется когда точная классификация неизвестна)
    *   **Документация:** [Key:highway](https://wiki.openstreetmap.org/wiki/Key:highway)

## 2. **Теги рельсового транспорта (Railway)**
*   **`railway`**: Ключ для объектов, связанных с железнодорожным и трамвайным движением.
    *   `tram` (трамвайные пути)
    *   `tram_stop` (остановка трамвая)
    *   `level_crossing` (пересечение путей трамвая)
    *   `tram_level_crossing` (пересечение путей трамвая)
    *   `tram_traffic_signals` (светофор для трамвая)
    *   **Документация:** [Key:railway](https://wiki.openstreetmap.org/wiki/Key:railway)

## 3. **Теги управления движением и перекрёстками**
*   **`junction`**: Тип перекрёстка.
    *   `roundabout` (кольцевая развязка)
    *   `uncontrolled` (нерегулируемый перекрёсток)
    *   `controlled` (регулируемый перекрёсток, например, со светофором)
    *   `no` (не является перекрёстком)
    *   `inout` (въезд/выезд, например, для сервисных дорог)
    *   `joint` (стык)

**Документация:**
- [Key:junction](https://wiki.openstreetmap.org/wiki/Key:junction)
- [OSMPIE Key:junction extended](./node.tags.junction.md)

*   **`traffic_signals`**: Светофор.
    *   **Документация:** [Tag:highway=traffic_signals](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dtraffic_signals)

*   **`crossing`**: Обозначение пешеходного перехода.
    *   `traffic_signals` (переход со светофором)
    *   **Документация:** [Key:crossing](https://wiki.openstreetmap.org/wiki/Key:crossing)

## 4. **Теги полос движения (Lanes)**
*   **`oneway`**: Обозначение одностороннего движения (`yes`, `no`, `reversible`).
    *   **Документация:** [Key:oneway](https://wiki.openstreetmap.org/wiki/Key:oneway)


*   **`lanes`**: Общее количество полос движения.
*   **`lanes:forward`**, **`lanes:backward`**: Количество полос для прямого и обратного направления.
*   **`lanes:both_ways`**: Количество полос, используемых для движения в обоих направлениях (например, на узкой дороге).
*   **`turn:lanes`**, **`turn:lanes:forward`**, **`turn:lanes:backward`**: Разметка по полосам для поворотов (например, `left|through|right`).
*   **`change:lanes`**: Разрешено ли перестроение между полосами (`yes`, `no`, `not_right`, `not_left`).
*   **`psv:lanes`**, **`bus:lanes`**, **`bicycle:lanes`**: Выделенные полосы для общественного транспорта, автобусов и велосипедистов.
*   **`width:lanes`**: Ширина полос.
*   **Документация:** [Key:lanes](https://wiki.openstreetmap.org/wiki/Key:lanes)

## 5. **Теги парковки (Parking)**
*   **`parking:left`**, **`parking:right`**, **`parking:both`**: Размещение парковки.
    *   `lane` (парковочная полоса)
    *   `shared_lane` (совмещённая полоса)
    *   `street_side` (уличная парковка)
    *   `link` (соединение)
*   **`parking:lane:orientation`**: Ориентация парковки (`parallel`, `diagonal`, `perpendicular`).
*   **`parking:lane:width`**: Ширина парковочной полосы.

**Документация:**
- [Street_parking](https://wiki.openstreetmap.org/wiki/Street_parking),
- [Key:parking:lane](https://wiki.openstreetmap.org/wiki/Key:parking:lane)

## 6. **Теги велосипедной инфраструктуры (Cycleway)**
*   **`cycleway`**, **`cycleway:left`**, **`cycleway:right`**, **`cycleway:both`**: Тип велосипедной инфраструктуры.
    *   `lane` (велосипедная полоса)
    *   `track` (обособленная велодорожка)
*   **`cycleway:lane:width`**: Ширина велосипедной полосы.
*   **`cycleway:lane:buffer`**: Буферная зона между велополосой и автодорогой.


   **Документация:** [Key:cycleway](https://wiki.openstreetmap.org/wiki/Key:cycleway)

## 7. **Теги общественного транспорта (Public Transport)**
*   **`highway=bus_stop`**: Остановка автобуса.
*   **`public_transport=platform`**, **`tram=yes`**: Платформа для трамвая.
*   **`public_transport=stop_position`**: Место остановки транспорта.
*   **`bus_bay`**: Карман для остановки автобуса.

**Документация:**
- [Key:public transport](https://wiki.openstreetmap.org/wiki/Key:public_transport)
- [bus_bay](https://wiki.openstreetmap.org/wiki/Key:bus_bay)

## 8. **Теги разметки и разделителей**
*   **`divider`**: Тип разделителя полос.
    *   `no` (отсутствует)
    *   `dashed_line` (прерывистая линия)
    *   `solid_line` (сплошная линия)
    *   `double_solid_line` (двойная сплошная)
*   **`road_marking=solid_stop_line`**: Стоп-линия.
*   **`crossing:markings`**: Разметка пешеходного перехода.
    *   `zebra` ("зебра")
    *   `zebra:double` (двойная "зебра")
    *   `zebra:bicolour` (двуцветная "зебра")
    *   `no` (отсутствует)
*   **`lane_markings`**: Наличие дорожной разметки (`yes`/`no`).

**Документация:**
- [Key:divider](https://wiki.openstreetmap.org/wiki/Key:divider)
- [Tag:road marking=solid stop line](https://wiki.openstreetmap.org/wiki/Tag:road_marking%3Dsolid_stop_line)
- [Key:crossing:markings](https://wiki.openstreetmap.org/wiki/Key:crossing:markings)

## 9. **Ограничения поворотов (Restrictions)**
*   **`type=restriction`**: Отношение (Relation), определяющее ограничение движения (например, запрет поворота).
*   **`restriction`**: Конкретное ограничение внутри отношения (например, `no_left_turn`).
*   **Роли в отношении:** `from`, `to`, `via`.

**Документация:** [Relation:restriction](https://wiki.openstreetmap.org/wiki/Relation:restriction)

## 10. **Прочие важные теги**
*   **`width`**: Общая ширина дороги или объекта.
*   **`layer`**: Вертикальный уровень для тоннелей, мостов и т.д.
*   **`surface`**: Покрытие (в коде есть фильтрация по `ground`, `compacted`, `steps`).
*   **`placement`**, **`placement:forward`**, **`placement:backward`**: Смещение оси дороги для сложной конфигурации полос.
*   **`junction:radius`**: Радиус скругления на перекрёстке.
*   **`junction:shape`**: Геометрия перекрёстка (`auto`, `rectangle`, `staggered`).
*   **`footway=crossing`**: Пешеходный переход.

**Документация:** Обязательно посмотрите статью про [placement](./examples/placement.md)

## 11. Глоссарий тегов с префиксом `osmpie:`

Эти теги предоставляют механизм для преодоления ограничений стандартных OSM-тегов и тонкой настройки процесса создания дорожной модели под специфические требования.
см [Вспомогательные теги](./perfect.junction.md#6-вспомогательные-теги-для-управления-рендером)


### 1. **`osmpie:usefull`**
- **Назначение**: Флаг для фильтрации сервисных дорог (service ways)
- **Значения**:
  - `yes` - дорога считается полезной и не должна фильтроваться
  - `no` - дорога должна быть исключена из обработки
- **Контекст использования**: Применяется к highway=service для ручного указания, нужно ли включать дорогу в итоговую модель


### 2. **`osmpie:fill`**
- **Назначение**: Управление плотностью узлов на длинных сегментах дорог
- **Значения**:
  - Числовое значение - минимальное расстояние между узлами в метрах
  - `yes` - использовать значение по умолчанию из настроек
  - `no` - отключить добавление узлов
- **Контекст использования**: Автоматическое добавление промежуточных узлов на длинных прямых участках для улучшения геометрии


### 3. **`osmpie:sparse`**
- **Назначение**: Управление разрежением избыточных узлов на дорогах
- **Значения**:
  - Числовое значение - минимальное расстояние между узлами в метрах
  - `yes` - агрессивное разрежение (большое расстояние)
  - `no` - отключить разрежение (сохранить все узлы)
- **Контекст использования**: Удаление лишних узлов, которые не несут семантической нагрузки (не являются перекрёстками, светофорами и т.д.)


### 4. **`osmpie:ignore`**
- **Назначение**: Полное исключение элемента из обработки
- **Значения**: `yes` - элемент игнорируется
- **Контекст использования**: Для элементов, которые не должны попадать в итоговую модель дорожной сети


### 5. **`osmpie:outer`**
- **Назначение**: Маркировка узлов, находящихся за пределами области обработки (bake area)
- **Значения**: `yes` - узел находится вне зоны интереса
- **Контекст использования**: Автоматически проставляется для узлов вне полигона обработки, чтобы исключить их из соединений

---

#### Назначение префикса `osmpie:`

Теги с префиксом `osmpie:` являются **служебными тегами**, которые:

1. **Управляют процессом трансформации** - влияют на то, как движок OSMPie обрабатывает OSM-данные
2. **Не являются стандартными OSM-тегами** - созданы специально для этого инструмента
3. **Позволяют тонкую настройку** обработки конкретных элементов карты
4. **Могут устанавливаться вручную** в OSM-данных или **автоматически** в процессе обработки


## Рекомендуемые статьи

Концепции, которые вводятся OSMPIE, и теги для их отображения

- [connect:lanes](./way.tags.connect:lanes.md)
- [junction:shape](./node.tags.junction:shape.md)
- [junction:radius](./node.tags.junction:radius.md)
- [junction:cluster:radius](./node.tags.junction:cluster:radius.md)
- [crossing:corner](./node.tags.crossing:corner.md)
