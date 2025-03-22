"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  {
      "date": "2024-01-01",
      "avg_view_duration": 276,
      "views": 100
  },
  {
      "date": "2024-01-02",
      "avg_view_duration": 279,
      "views": 126
  },
  {
      "date": "2024-01-03",
      "avg_view_duration": 283,
      "views": 116
  },
  {
      "date": "2024-01-04",
      "avg_view_duration": 287,
      "views": 121
  },
  {
      "date": "2024-01-05",
      "avg_view_duration": 267,
      "views": 117
  },
  {
      "date": "2024-01-06",
      "avg_view_duration": 261,
      "views": 112
  },
  {
      "date": "2024-01-07",
      "avg_view_duration": 247,
      "views": 153
  },
  {
      "date": "2024-01-08",
      "avg_view_duration": 299,
      "views": 133
  },
  {
      "date": "2024-01-09",
      "avg_view_duration": 274,
      "views": 128
  },
  {
      "date": "2024-01-10",
      "avg_view_duration": 289,
      "views": 118
  },
  {
      "date": "2024-01-11",
      "avg_view_duration": 278,
      "views": 117
  },
  {
      "date": "2024-01-12",
      "avg_view_duration": 299,
      "views": 132
  },
  {
      "date": "2024-01-13",
      "avg_view_duration": 241,
      "views": 148
  },
  {
      "date": "2024-01-14",
      "avg_view_duration": 271,
      "views": 135
  },
  {
      "date": "2024-01-15",
      "avg_view_duration": 248,
      "views": 128
  },
  {
      "date": "2024-01-16",
      "avg_view_duration": 227,
      "views": 154
  },
  {
      "date": "2024-01-17",
      "avg_view_duration": 269,
      "views": 145
  },
  {
      "date": "2024-01-18",
      "avg_view_duration": 272,
      "views": 123
  },
  {
      "date": "2024-01-19",
      "avg_view_duration": 252,
      "views": 130
  },
  {
      "date": "2024-01-20",
      "avg_view_duration": 316,
      "views": 108
  },
  {
      "date": "2024-01-21",
      "avg_view_duration": 271,
      "views": 88
  },
  {
      "date": "2024-01-22",
      "avg_view_duration": 280,
      "views": 90
  },
  {
      "date": "2024-01-23",
      "avg_view_duration": 271,
      "views": 109
  },
  {
      "date": "2024-01-24",
      "avg_view_duration": 307,
      "views": 126
  },
  {
      "date": "2024-01-25",
      "avg_view_duration": 347,
      "views": 117
  },
  {
      "date": "2024-01-26",
      "avg_view_duration": 286,
      "views": 140
  },
  {
      "date": "2024-01-27",
      "avg_view_duration": 301,
      "views": 114
  },
  {
      "date": "2024-01-28",
      "avg_view_duration": 296,
      "views": 122
  },
  {
      "date": "2024-01-29",
      "avg_view_duration": 277,
      "views": 163
  },
  {
      "date": "2024-01-30",
      "avg_view_duration": 289,
      "views": 137
  },
  {
      "date": "2024-01-31",
      "avg_view_duration": 266,
      "views": 135
  },
  {
      "date": "2024-02-01",
      "avg_view_duration": 273,
      "views": 110
  },
  {
      "date": "2024-02-02",
      "avg_view_duration": 268,
      "views": 117
  },
  {
      "date": "2024-02-03",
      "avg_view_duration": 283,
      "views": 130
  },
  {
      "date": "2024-02-04",
      "avg_view_duration": 308,
      "views": 97
  },
  {
      "date": "2024-02-05",
      "avg_view_duration": 304,
      "views": 79
  },
  {
      "date": "2024-02-06",
      "avg_view_duration": 273,
      "views": 95
  },
  {
      "date": "2024-02-07",
      "avg_view_duration": 272,
      "views": 89
  },
  {
      "date": "2024-02-08",
      "avg_view_duration": 305,
      "views": 95
  },
  {
      "date": "2024-02-09",
      "avg_view_duration": 316,
      "views": 96
  },
  {
      "date": "2024-02-10",
      "avg_view_duration": 319,
      "views": 80
  },
  {
      "date": "2024-02-11",
      "avg_view_duration": 312,
      "views": 83
  },
  {
      "date": "2024-02-12",
      "avg_view_duration": 324,
      "views": 80
  },
  {
      "date": "2024-02-13",
      "avg_view_duration": 282,
      "views": 98
  },
  {
      "date": "2024-02-14",
      "avg_view_duration": 269,
      "views": 94
  },
  {
      "date": "2024-02-15",
      "avg_view_duration": 329,
      "views": 88
  },
  {
      "date": "2024-02-16",
      "avg_view_duration": 273,
      "views": 84
  },
  {
      "date": "2024-02-17",
      "avg_view_duration": 245,
      "views": 86
  },
  {
      "date": "2024-02-18",
      "avg_view_duration": 282,
      "views": 85
  },
  {
      "date": "2024-02-19",
      "avg_view_duration": 296,
      "views": 98
  },
  {
      "date": "2024-02-20",
      "avg_view_duration": 298,
      "views": 112
  },
  {
      "date": "2024-02-21",
      "avg_view_duration": 274,
      "views": 89
  },
  {
      "date": "2024-02-22",
      "avg_view_duration": 280,
      "views": 107
  },
  {
      "date": "2024-02-23",
      "avg_view_duration": 269,
      "views": 120
  },
  {
      "date": "2024-02-24",
      "avg_view_duration": 291,
      "views": 88
  },
  {
      "date": "2024-02-25",
      "avg_view_duration": 264,
      "views": 93
  },
  {
      "date": "2024-02-26",
      "avg_view_duration": 291,
      "views": 114
  },
  {
      "date": "2024-02-27",
      "avg_view_duration": 313,
      "views": 90
  },
  {
      "date": "2024-02-28",
      "avg_view_duration": 300,
      "views": 87
  },
  {
      "date": "2024-02-29",
      "avg_view_duration": 292,
      "views": 90
  },
  {
      "date": "2024-03-01",
      "avg_view_duration": 309,
      "views": 106
  },
  {
      "date": "2024-03-02",
      "avg_view_duration": 275,
      "views": 105
  },
  {
      "date": "2024-03-03",
      "avg_view_duration": 351,
      "views": 70
  },
  {
      "date": "2024-03-04",
      "avg_view_duration": 281,
      "views": 88
  },
  {
      "date": "2024-03-05",
      "avg_view_duration": 274,
      "views": 109
  },
  {
      "date": "2024-03-06",
      "avg_view_duration": 258,
      "views": 100
  },
  {
      "date": "2024-03-07",
      "avg_view_duration": 252,
      "views": 110
  },
  {
      "date": "2024-03-08",
      "avg_view_duration": 286,
      "views": 101
  },
  {
      "date": "2024-03-09",
      "avg_view_duration": 271,
      "views": 111
  },
  {
      "date": "2024-03-10",
      "avg_view_duration": 284,
      "views": 95
  },
  {
      "date": "2024-03-11",
      "avg_view_duration": 281,
      "views": 91
  },
  {
      "date": "2024-03-12",
      "avg_view_duration": 288,
      "views": 126
  },
  {
      "date": "2024-03-13",
      "avg_view_duration": 276,
      "views": 94
  },
  {
      "date": "2024-03-14",
      "avg_view_duration": 310,
      "views": 121
  },
  {
      "date": "2024-03-15",
      "avg_view_duration": 280,
      "views": 131
  },
  {
      "date": "2024-03-16",
      "avg_view_duration": 239,
      "views": 110
  },
  {
      "date": "2024-03-17",
      "avg_view_duration": 222,
      "views": 197
  },
  {
      "date": "2024-03-18",
      "avg_view_duration": 286,
      "views": 132
  },
  {
      "date": "2024-03-19",
      "avg_view_duration": 271,
      "views": 129
  },
  {
      "date": "2024-03-20",
      "avg_view_duration": 277,
      "views": 121
  },
  {
      "date": "2024-03-21",
      "avg_view_duration": 279,
      "views": 101
  },
  {
      "date": "2024-03-22",
      "avg_view_duration": 287,
      "views": 82
  },
  {
      "date": "2024-03-23",
      "avg_view_duration": 259,
      "views": 140
  },
  {
      "date": "2024-03-24",
      "avg_view_duration": 262,
      "views": 110
  },
  {
      "date": "2024-03-25",
      "avg_view_duration": 276,
      "views": 102
  },
  {
      "date": "2024-03-26",
      "avg_view_duration": 302,
      "views": 98
  },
  {
      "date": "2024-03-27",
      "avg_view_duration": 270,
      "views": 98
  },
  {
      "date": "2024-03-28",
      "avg_view_duration": 370,
      "views": 125
  },
  {
      "date": "2024-03-29",
      "avg_view_duration": 284,
      "views": 114
  },
  {
      "date": "2024-03-30",
      "avg_view_duration": 261,
      "views": 134
  },
  {
      "date": "2024-03-31",
      "avg_view_duration": 295,
      "views": 88
  },
  {
      "date": "2024-04-01",
      "avg_view_duration": 265,
      "views": 111
  },
  {
      "date": "2024-04-02",
      "avg_view_duration": 295,
      "views": 101
  },
  {
      "date": "2024-04-03",
      "avg_view_duration": 291,
      "views": 115
  },
  {
      "date": "2024-04-04",
      "avg_view_duration": 301,
      "views": 108
  },
  {
      "date": "2024-04-05",
      "avg_view_duration": 251,
      "views": 125
  },
  {
      "date": "2024-04-06",
      "avg_view_duration": 251,
      "views": 103
  },
  {
      "date": "2024-04-07",
      "avg_view_duration": 252,
      "views": 136
  },
  {
      "date": "2024-04-08",
      "avg_view_duration": 209,
      "views": 158
  },
  {
      "date": "2024-04-09",
      "avg_view_duration": 275,
      "views": 137
  },
  {
      "date": "2024-04-10",
      "avg_view_duration": 261,
      "views": 128
  },
  {
      "date": "2024-04-11",
      "avg_view_duration": 268,
      "views": 113
  },
  {
      "date": "2024-04-12",
      "avg_view_duration": 302,
      "views": 140
  },
  {
      "date": "2024-04-13",
      "avg_view_duration": 247,
      "views": 182
  },
  {
      "date": "2024-04-14",
      "avg_view_duration": 261,
      "views": 148
  },
  {
      "date": "2024-04-15",
      "avg_view_duration": 274,
      "views": 126
  },
  {
      "date": "2024-04-16",
      "avg_view_duration": 319,
      "views": 148
  },
  {
      "date": "2024-04-17",
      "avg_view_duration": 244,
      "views": 138
  },
  {
      "date": "2024-04-18",
      "avg_view_duration": 268,
      "views": 109
  },
  {
      "date": "2024-04-19",
      "avg_view_duration": 317,
      "views": 124
  },
  {
      "date": "2024-04-20",
      "avg_view_duration": 268,
      "views": 122
  },
  {
      "date": "2024-04-21",
      "avg_view_duration": 269,
      "views": 116
  },
  {
      "date": "2024-04-22",
      "avg_view_duration": 295,
      "views": 115
  },
  {
      "date": "2024-04-23",
      "avg_view_duration": 302,
      "views": 112
  },
  {
      "date": "2024-04-24",
      "avg_view_duration": 256,
      "views": 144
  },
  {
      "date": "2024-04-25",
      "avg_view_duration": 261,
      "views": 132
  },
  {
      "date": "2024-04-26",
      "avg_view_duration": 282,
      "views": 122
  },
  {
      "date": "2024-04-27",
      "avg_view_duration": 286,
      "views": 108
  },
  {
      "date": "2024-04-28",
      "avg_view_duration": 269,
      "views": 108
  },
  {
      "date": "2024-04-29",
      "avg_view_duration": 290,
      "views": 105
  },
  {
      "date": "2024-04-30",
      "avg_view_duration": 279,
      "views": 130
  },
  {
      "date": "2024-05-01",
      "avg_view_duration": 292,
      "views": 110
  },
  {
      "date": "2024-05-02",
      "avg_view_duration": 290,
      "views": 135
  },
  {
      "date": "2024-05-03",
      "avg_view_duration": 264,
      "views": 166
  },
  {
      "date": "2024-05-04",
      "avg_view_duration": 296,
      "views": 102
  },
  {
      "date": "2024-05-05",
      "avg_view_duration": 258,
      "views": 106
  },
  {
      "date": "2024-05-06",
      "avg_view_duration": 283,
      "views": 102
  },
  {
      "date": "2024-05-07",
      "avg_view_duration": 303,
      "views": 69
  },
  {
      "date": "2024-05-08",
      "avg_view_duration": 245,
      "views": 112
  },
  {
      "date": "2024-05-09",
      "avg_view_duration": 291,
      "views": 96
  },
  {
      "date": "2024-05-10",
      "avg_view_duration": 308,
      "views": 109
  },
  {
      "date": "2024-05-11",
      "avg_view_duration": 252,
      "views": 103
  },
  {
      "date": "2024-05-12",
      "avg_view_duration": 295,
      "views": 111
  },
  {
      "date": "2024-05-13",
      "avg_view_duration": 280,
      "views": 123
  },
  {
      "date": "2024-05-14",
      "avg_view_duration": 300,
      "views": 111
  },
  {
      "date": "2024-05-15",
      "avg_view_duration": 267,
      "views": 113
  },
  {
      "date": "2024-05-16",
      "avg_view_duration": 332,
      "views": 104
  },
  {
      "date": "2024-05-17",
      "avg_view_duration": 309,
      "views": 98
  },
  {
      "date": "2024-05-18",
      "avg_view_duration": 253,
      "views": 123
  },
  {
      "date": "2024-05-19",
      "avg_view_duration": 285,
      "views": 91
  },
  {
      "date": "2024-05-20",
      "avg_view_duration": 304,
      "views": 107
  },
  {
      "date": "2024-05-21",
      "avg_view_duration": 279,
      "views": 104
  },
  {
      "date": "2024-05-22",
      "avg_view_duration": 298,
      "views": 81
  },
  {
      "date": "2024-05-23",
      "avg_view_duration": 240,
      "views": 102
  },
  {
      "date": "2024-05-24",
      "avg_view_duration": 276,
      "views": 109
  },
  {
      "date": "2024-05-25",
      "avg_view_duration": 267,
      "views": 104
  },
  {
      "date": "2024-05-26",
      "avg_view_duration": 221,
      "views": 144
  },
  {
      "date": "2024-05-27",
      "avg_view_duration": 268,
      "views": 144
  },
  {
      "date": "2024-05-28",
      "avg_view_duration": 303,
      "views": 119
  },
  {
      "date": "2024-05-29",
      "avg_view_duration": 277,
      "views": 138
  },
  {
      "date": "2024-05-30",
      "avg_view_duration": 297,
      "views": 141
  },
  {
      "date": "2024-05-31",
      "avg_view_duration": 286,
      "views": 127
  },
  {
      "date": "2024-06-01",
      "avg_view_duration": 290,
      "views": 95
  },
  {
      "date": "2024-06-02",
      "avg_view_duration": 280,
      "views": 104
  },
  {
      "date": "2024-06-03",
      "avg_view_duration": 268,
      "views": 86
  },
  {
      "date": "2024-06-04",
      "avg_view_duration": 246,
      "views": 93
  },
  {
      "date": "2024-06-05",
      "avg_view_duration": 300,
      "views": 96
  },
  {
      "date": "2024-06-06",
      "avg_view_duration": 265,
      "views": 92
  },
  {
      "date": "2024-06-07",
      "avg_view_duration": 279,
      "views": 82
  },
  {
      "date": "2024-06-08",
      "avg_view_duration": 273,
      "views": 87
  },
  {
      "date": "2024-06-09",
      "avg_view_duration": 304,
      "views": 75
  },
  {
      "date": "2024-06-10",
      "avg_view_duration": 328,
      "views": 83
  },
  {
      "date": "2024-06-11",
      "avg_view_duration": 296,
      "views": 87
  },
  {
      "date": "2024-06-12",
      "avg_view_duration": 250,
      "views": 99
  },
  {
      "date": "2024-06-13",
      "avg_view_duration": 276,
      "views": 100
  },
  {
      "date": "2024-06-14",
      "avg_view_duration": 305,
      "views": 111
  },
  {
      "date": "2024-06-15",
      "avg_view_duration": 304,
      "views": 90
  },
  {
      "date": "2024-06-16",
      "avg_view_duration": 250,
      "views": 80
  },
  {
      "date": "2024-06-17",
      "avg_view_duration": 314,
      "views": 74
  },
  {
      "date": "2024-06-18",
      "avg_view_duration": 258,
      "views": 108
  },
  {
      "date": "2024-06-19",
      "avg_view_duration": 278,
      "views": 98
  },
  {
      "date": "2024-06-20",
      "avg_view_duration": 276,
      "views": 111
  },
  {
      "date": "2024-06-21",
      "avg_view_duration": 284,
      "views": 105
  },
  {
      "date": "2024-06-22",
      "avg_view_duration": 232,
      "views": 83
  },
  {
      "date": "2024-06-23",
      "avg_view_duration": 291,
      "views": 87
  },
  {
      "date": "2024-06-24",
      "avg_view_duration": 284,
      "views": 84
  },
  {
      "date": "2024-06-25",
      "avg_view_duration": 296,
      "views": 93
  },
  {
      "date": "2024-06-26",
      "avg_view_duration": 270,
      "views": 111
  },
  {
      "date": "2024-06-27",
      "avg_view_duration": 292,
      "views": 97
  },
  {
      "date": "2024-06-28",
      "avg_view_duration": 289,
      "views": 79
  },
  {
      "date": "2024-06-29",
      "avg_view_duration": 276,
      "views": 87
  },
  {
      "date": "2024-06-30",
      "avg_view_duration": 224,
      "views": 90
  },
  {
      "date": "2024-07-01",
      "avg_view_duration": 283,
      "views": 80
  },
  {
      "date": "2024-07-02",
      "avg_view_duration": 281,
      "views": 68
  },
  {
      "date": "2024-07-03",
      "avg_view_duration": 278,
      "views": 71
  },
  {
      "date": "2024-07-04",
      "avg_view_duration": 273,
      "views": 69
  },
  {
      "date": "2024-07-05",
      "avg_view_duration": 268,
      "views": 82
  },
  {
      "date": "2024-07-06",
      "avg_view_duration": 234,
      "views": 54
  },
  {
      "date": "2024-07-07",
      "avg_view_duration": 268,
      "views": 55
  },
  {
      "date": "2024-07-08",
      "avg_view_duration": 306,
      "views": 60
  },
  {
      "date": "2024-07-09",
      "avg_view_duration": 328,
      "views": 69
  },
  {
      "date": "2024-07-10",
      "avg_view_duration": 290,
      "views": 52
  },
  {
      "date": "2024-07-11",
      "avg_view_duration": 298,
      "views": 55
  },
  {
      "date": "2024-07-12",
      "avg_view_duration": 311,
      "views": 52
  },
  {
      "date": "2024-07-13",
      "avg_view_duration": 269,
      "views": 46
  },
  {
      "date": "2024-07-14",
      "avg_view_duration": 310,
      "views": 55
  },
  {
      "date": "2024-07-15",
      "avg_view_duration": 311,
      "views": 48
  },
  {
      "date": "2024-07-16",
      "avg_view_duration": 250,
      "views": 59
  },
  {
      "date": "2024-07-17",
      "avg_view_duration": 288,
      "views": 71
  },
  {
      "date": "2024-07-18",
      "avg_view_duration": 277,
      "views": 62
  },
  {
      "date": "2024-07-19",
      "avg_view_duration": 250,
      "views": 55
  },
  {
      "date": "2024-07-20",
      "avg_view_duration": 280,
      "views": 59
  },
  {
      "date": "2024-07-21",
      "avg_view_duration": 293,
      "views": 69
  },
  {
      "date": "2024-07-22",
      "avg_view_duration": 332,
      "views": 57
  },
  {
      "date": "2024-07-23",
      "avg_view_duration": 300,
      "views": 61
  },
  {
      "date": "2024-07-24",
      "avg_view_duration": 314,
      "views": 56
  },
  {
      "date": "2024-07-25",
      "avg_view_duration": 315,
      "views": 59
  },
  {
      "date": "2024-07-26",
      "avg_view_duration": 322,
      "views": 48
  },
  {
      "date": "2024-07-27",
      "avg_view_duration": 315,
      "views": 51
  },
  {
      "date": "2024-07-28",
      "avg_view_duration": 270,
      "views": 42
  },
  {
      "date": "2024-07-29",
      "avg_view_duration": 327,
      "views": 58
  },
  {
      "date": "2024-07-30",
      "avg_view_duration": 326,
      "views": 62
  },
  {
      "date": "2024-07-31",
      "avg_view_duration": 289,
      "views": 75
  },
  {
      "date": "2024-08-01",
      "avg_view_duration": 256,
      "views": 54
  },
  {
      "date": "2024-08-02",
      "avg_view_duration": 277,
      "views": 44
  },
  {
      "date": "2024-08-03",
      "avg_view_duration": 278,
      "views": 52
  },
  {
      "date": "2024-08-04",
      "avg_view_duration": 277,
      "views": 60
  },
  {
      "date": "2024-08-05",
      "avg_view_duration": 386,
      "views": 39
  },
  {
      "date": "2024-08-06",
      "avg_view_duration": 326,
      "views": 53
  },
  {
      "date": "2024-08-07",
      "avg_view_duration": 258,
      "views": 70
  },
  {
      "date": "2024-08-08",
      "avg_view_duration": 292,
      "views": 62
  },
  {
      "date": "2024-08-09",
      "avg_view_duration": 300,
      "views": 61
  },
  {
      "date": "2024-08-10",
      "avg_view_duration": 189,
      "views": 51
  },
  {
      "date": "2024-08-11",
      "avg_view_duration": 275,
      "views": 52
  },
  {
      "date": "2024-08-12",
      "avg_view_duration": 278,
      "views": 52
  },
  {
      "date": "2024-08-13",
      "avg_view_duration": 293,
      "views": 61
  },
  {
      "date": "2024-08-14",
      "avg_view_duration": 279,
      "views": 40
  },
  {
      "date": "2024-08-15",
      "avg_view_duration": 295,
      "views": 57
  },
  {
      "date": "2024-08-16",
      "avg_view_duration": 298,
      "views": 49
  },
  {
      "date": "2024-08-17",
      "avg_view_duration": 250,
      "views": 49
  },
  {
      "date": "2024-08-18",
      "avg_view_duration": 218,
      "views": 59
  },
  {
      "date": "2024-08-19",
      "avg_view_duration": 298,
      "views": 37
  },
  {
      "date": "2024-08-20",
      "avg_view_duration": 282,
      "views": 47
  },
  {
      "date": "2024-08-21",
      "avg_view_duration": 308,
      "views": 58
  },
  {
      "date": "2024-08-22",
      "avg_view_duration": 315,
      "views": 49
  },
  {
      "date": "2024-08-23",
      "avg_view_duration": 300,
      "views": 61
  },
  {
      "date": "2024-08-24",
      "avg_view_duration": 194,
      "views": 60
  },
  {
      "date": "2024-08-25",
      "avg_view_duration": 255,
      "views": 38
  },
  {
      "date": "2024-08-26",
      "avg_view_duration": 294,
      "views": 49
  },
  {
      "date": "2024-08-27",
      "avg_view_duration": 198,
      "views": 67
  },
  {
      "date": "2024-08-28",
      "avg_view_duration": 256,
      "views": 46
  },
  {
      "date": "2024-08-29",
      "avg_view_duration": 320,
      "views": 48
  },
  {
      "date": "2024-08-30",
      "avg_view_duration": 259,
      "views": 69
  },
  {
      "date": "2024-08-31",
      "avg_view_duration": 319,
      "views": 60
  },
  {
      "date": "2024-09-01",
      "avg_view_duration": 283,
      "views": 73
  },
  {
      "date": "2024-09-02",
      "avg_view_duration": 255,
      "views": 65
  },
  {
      "date": "2024-09-03",
      "avg_view_duration": 265,
      "views": 68
  },
  {
      "date": "2024-09-04",
      "avg_view_duration": 252,
      "views": 65
  },
  {
      "date": "2024-09-05",
      "avg_view_duration": 252,
      "views": 75
  },
  {
      "date": "2024-09-06",
      "avg_view_duration": 227,
      "views": 82
  },
  {
      "date": "2024-09-07",
      "avg_view_duration": 232,
      "views": 78
  },
  {
      "date": "2024-09-08",
      "avg_view_duration": 301,
      "views": 65
  },
  {
      "date": "2024-09-09",
      "avg_view_duration": 335,
      "views": 52
  },
  {
      "date": "2024-09-10",
      "avg_view_duration": 264,
      "views": 53
  },
  {
      "date": "2024-09-11",
      "avg_view_duration": 292,
      "views": 51
  },
  {
      "date": "2024-09-12",
      "avg_view_duration": 319,
      "views": 52
  },
  {
      "date": "2024-09-13",
      "avg_view_duration": 294,
      "views": 61
  },
  {
      "date": "2024-09-14",
      "avg_view_duration": 295,
      "views": 64
  },
  {
      "date": "2024-09-15",
      "avg_view_duration": 254,
      "views": 60
  },
  {
      "date": "2024-09-16",
      "avg_view_duration": 274,
      "views": 64
  },
  {
      "date": "2024-09-17",
      "avg_view_duration": 308,
      "views": 65
  },
  {
      "date": "2024-09-18",
      "avg_view_duration": 258,
      "views": 67
  },
  {
      "date": "2024-09-19",
      "avg_view_duration": 243,
      "views": 57
  },
  {
      "date": "2024-09-20",
      "avg_view_duration": 294,
      "views": 48
  },
  {
      "date": "2024-09-21",
      "avg_view_duration": 325,
      "views": 61
  },
  {
      "date": "2024-09-22",
      "avg_view_duration": 266,
      "views": 51
  },
  {
      "date": "2024-09-23",
      "avg_view_duration": 280,
      "views": 48
  },
  {
      "date": "2024-09-24",
      "avg_view_duration": 279,
      "views": 73
  },
  {
      "date": "2024-09-25",
      "avg_view_duration": 292,
      "views": 64
  },
  {
      "date": "2024-09-26",
      "avg_view_duration": 282,
      "views": 67
  },
  {
      "date": "2024-09-27",
      "avg_view_duration": 289,
      "views": 56
  },
  {
      "date": "2024-09-28",
      "avg_view_duration": 256,
      "views": 74
  },
  {
      "date": "2024-09-29",
      "avg_view_duration": 276,
      "views": 67
  },
  {
      "date": "2024-09-30",
      "avg_view_duration": 250,
      "views": 80
  },
  {
      "date": "2024-10-01",
      "avg_view_duration": 270,
      "views": 54
  },
  {
      "date": "2024-10-02",
      "avg_view_duration": 307,
      "views": 43
  },
  {
      "date": "2024-10-03",
      "avg_view_duration": 282,
      "views": 50
  },
  {
      "date": "2024-10-04",
      "avg_view_duration": 293,
      "views": 41
  },
  {
      "date": "2024-10-05",
      "avg_view_duration": 298,
      "views": 44
  },
  {
      "date": "2024-10-06",
      "avg_view_duration": 289,
      "views": 46
  },
  {
      "date": "2024-10-07",
      "avg_view_duration": 300,
      "views": 57
  },
  {
      "date": "2024-10-08",
      "avg_view_duration": 271,
      "views": 44
  },
  {
      "date": "2024-10-09",
      "avg_view_duration": 285,
      "views": 46
  },
  {
      "date": "2024-10-10",
      "avg_view_duration": 298,
      "views": 45
  },
  {
      "date": "2024-10-11",
      "avg_view_duration": 267,
      "views": 43
  },
  {
      "date": "2024-10-12",
      "avg_view_duration": 310,
      "views": 49
  },
  {
      "date": "2024-10-13",
      "avg_view_duration": 253,
      "views": 63
  },
  {
      "date": "2024-10-14",
      "avg_view_duration": 286,
      "views": 54
  },
  {
      "date": "2024-10-15",
      "avg_view_duration": 259,
      "views": 52
  },
  {
      "date": "2024-10-16",
      "avg_view_duration": 301,
      "views": 72
  },
  {
      "date": "2024-10-17",
      "avg_view_duration": 275,
      "views": 53
  },
  {
      "date": "2024-10-18",
      "avg_view_duration": 245,
      "views": 54
  },
  {
      "date": "2024-10-19",
      "avg_view_duration": 253,
      "views": 44
  },
  {
      "date": "2024-10-20",
      "avg_view_duration": 249,
      "views": 62
  },
  {
      "date": "2024-10-21",
      "avg_view_duration": 286,
      "views": 51
  },
  {
      "date": "2024-10-22",
      "avg_view_duration": 291,
      "views": 58
  },
  {
      "date": "2024-10-23",
      "avg_view_duration": 275,
      "views": 47
  },
  {
      "date": "2024-10-24",
      "avg_view_duration": 285,
      "views": 67
  },
  {
      "date": "2024-10-25",
      "avg_view_duration": 301,
      "views": 41
  },
  {
      "date": "2024-10-26",
      "avg_view_duration": 354,
      "views": 41
  },
  {
      "date": "2024-10-27",
      "avg_view_duration": 302,
      "views": 51
  },
  {
      "date": "2024-10-28",
      "avg_view_duration": 299,
      "views": 58
  },
  {
      "date": "2024-10-29",
      "avg_view_duration": 340,
      "views": 39
  },
  {
      "date": "2024-10-30",
      "avg_view_duration": 344,
      "views": 34
  },
  {
      "date": "2024-10-31",
      "avg_view_duration": 250,
      "views": 51
  },
  {
      "date": "2024-11-01",
      "avg_view_duration": 254,
      "views": 49
  },
  {
      "date": "2024-11-02",
      "avg_view_duration": 308,
      "views": 42
  },
  {
      "date": "2024-11-03",
      "avg_view_duration": 310,
      "views": 62
  },
  {
      "date": "2024-11-04",
      "avg_view_duration": 307,
      "views": 51
  },
  {
      "date": "2024-11-05",
      "avg_view_duration": 251,
      "views": 47
  },
  {
      "date": "2024-11-06",
      "avg_view_duration": 311,
      "views": 62
  },
  {
      "date": "2024-11-07",
      "avg_view_duration": 285,
      "views": 54
  },
  {
      "date": "2024-11-08",
      "avg_view_duration": 323,
      "views": 50
  },
  {
      "date": "2024-11-09",
      "avg_view_duration": 287,
      "views": 68
  },
  {
      "date": "2024-11-10",
      "avg_view_duration": 242,
      "views": 57
  },
  {
      "date": "2024-11-11",
      "avg_view_duration": 294,
      "views": 54
  },
  {
      "date": "2024-11-12",
      "avg_view_duration": 305,
      "views": 64
  },
  {
      "date": "2024-11-13",
      "avg_view_duration": 314,
      "views": 65
  },
  {
      "date": "2024-11-14",
      "avg_view_duration": 270,
      "views": 77
  },
  {
      "date": "2024-11-15",
      "avg_view_duration": 279,
      "views": 63
  },
  {
      "date": "2024-11-16",
      "avg_view_duration": 292,
      "views": 52
  },
  {
      "date": "2024-11-17",
      "avg_view_duration": 244,
      "views": 69
  },
  {
      "date": "2024-11-18",
      "avg_view_duration": 303,
      "views": 54
  },
  {
      "date": "2024-11-19",
      "avg_view_duration": 227,
      "views": 60
  },
  {
      "date": "2024-11-20",
      "avg_view_duration": 313,
      "views": 50
  },
  {
      "date": "2024-11-21",
      "avg_view_duration": 310,
      "views": 64
  },
  {
      "date": "2024-11-22",
      "avg_view_duration": 282,
      "views": 48
  },
  {
      "date": "2024-11-23",
      "avg_view_duration": 249,
      "views": 63
  },
  {
      "date": "2024-11-24",
      "avg_view_duration": 306,
      "views": 51
  },
  {
      "date": "2024-11-25",
      "avg_view_duration": 288,
      "views": 51
  },
  {
      "date": "2024-11-26",
      "avg_view_duration": 282,
      "views": 70
  },
  {
      "date": "2024-11-27",
      "avg_view_duration": 309,
      "views": 78
  },
  {
      "date": "2024-11-28",
      "avg_view_duration": 282,
      "views": 60
  },
  {
      "date": "2024-11-29",
      "avg_view_duration": 294,
      "views": 59
  },
  {
      "date": "2024-11-30",
      "avg_view_duration": 249,
      "views": 63
  },
  {
      "date": "2024-12-01",
      "avg_view_duration": 240,
      "views": 68
  },
  {
      "date": "2024-12-02",
      "avg_view_duration": 302,
      "views": 55
  },
  {
      "date": "2024-12-03",
      "avg_view_duration": 304,
      "views": 49
  },
  {
      "date": "2024-12-04",
      "avg_view_duration": 304,
      "views": 58
  },
  {
      "date": "2024-12-05",
      "avg_view_duration": 324,
      "views": 56
  },
  {
      "date": "2024-12-06",
      "avg_view_duration": 273,
      "views": 54
  },
  {
      "date": "2024-12-07",
      "avg_view_duration": 251,
      "views": 53
  },
  {
      "date": "2024-12-08",
      "avg_view_duration": 246,
      "views": 66
  },
  {
      "date": "2024-12-09",
      "avg_view_duration": 184,
      "views": 106
  },
  {
      "date": "2024-12-10",
      "avg_view_duration": 262,
      "views": 47
  },
  {
      "date": "2024-12-11",
      "avg_view_duration": 306,
      "views": 63
  },
  {
      "date": "2024-12-12",
      "avg_view_duration": 260,
      "views": 54
  },
  {
      "date": "2024-12-13",
      "avg_view_duration": 264,
      "views": 37
  },
  {
      "date": "2024-12-14",
      "avg_view_duration": 280,
      "views": 45
  },
  {
      "date": "2024-12-15",
      "avg_view_duration": 281,
      "views": 53
  },
  {
      "date": "2024-12-16",
      "avg_view_duration": 285,
      "views": 67
  },
  {
      "date": "2024-12-17",
      "avg_view_duration": 289,
      "views": 70
  },
  {
      "date": "2024-12-18",
      "avg_view_duration": 312,
      "views": 55
  },
  {
      "date": "2024-12-19",
      "avg_view_duration": 308,
      "views": 52
  },
  {
      "date": "2024-12-20",
      "avg_view_duration": 277,
      "views": 62
  },
  {
      "date": "2024-12-21",
      "avg_view_duration": 260,
      "views": 59
  },
  {
      "date": "2024-12-22",
      "avg_view_duration": 285,
      "views": 52
  },
  {
      "date": "2024-12-23",
      "avg_view_duration": 246,
      "views": 55
  },
  {
      "date": "2024-12-24",
      "avg_view_duration": 251,
      "views": 47
  },
  {
      "date": "2024-12-25",
      "avg_view_duration": 220,
      "views": 40
  },
  {
      "date": "2024-12-26",
      "avg_view_duration": 260,
      "views": 70
  },
  {
      "date": "2024-12-27",
      "avg_view_duration": 320,
      "views": 48
  },
  {
      "date": "2024-12-28",
      "avg_view_duration": 286,
      "views": 51
  },
  {
      "date": "2024-12-29",
      "avg_view_duration": 312,
      "views": 68
  },
  {
      "date": "2024-12-30",
      "avg_view_duration": 349,
      "views": 65
  },
  {
      "date": "2024-12-31",
      "avg_view_duration": 258,
      "views": 71
  }
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "avg_view_duration",
    color: "var(--primary)",
  },
  mobile: {
    label: "views",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])
  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date()
      let daysToSubtract = 90 // default
      
      switch (timeRange) {
        case "365d":
          daysToSubtract = 365
          break
        case "180d":
          daysToSubtract = 180
          break
        case "90d":
          daysToSubtract = 90
          break
        default:
          daysToSubtract = 90
      }

      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }, [timeRange])
  
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="365d">Last 1 Year</ToggleGroupItem>
            <ToggleGroupItem value="180d">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="365d" className="rounded-lg">
                Last 1 Year
              </SelectItem>
              <SelectItem value="180d" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="avg_view_duration"
              type="natural"
              fill="#222222"
              stroke="#66ff00"
              stackId="a"
            />
            <Area
              dataKey="views"
              type="natural"
              fill="#22222"
              stroke="#ff6f00"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}