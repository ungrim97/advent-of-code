package main

import (
    "flag"
    "fmt"
    "strings"
    "strconv"
)

func main() {
    sequence := flag.String("input", "", "Sequence to parse")
    flag.Parse()

    fmt.Println("Sequence: ", *sequence)
    sequenceList := strings.Split(*sequence, "")

    total := 0
    for index, value := range sequenceList {
        int_value, _ := strconv.Atoi(value)

        if len(sequenceList) > index + 1 {
            if sequenceList[index + 1] == value {
                fmt.Println(value, "matches", sequenceList[index + 1])
                total += int_value
            }
        } else {
            if sequenceList[0] == value {
                fmt.Println(value, "matches", sequenceList[0])
                total += int_value
            }
        }
    }

    fmt.Println("Total: ", total)
}
