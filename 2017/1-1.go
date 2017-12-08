package main

import (
    "bufio"
    "os"
    "fmt"
    "strings"
    "strconv"
)

func main() {
    dataFile, err := os.Open("1.data")
    if err != nil {
        panic(err)
    }

    scanner := bufio.NewScanner(dataFile)
    var sequence string
    for scanner.Scan() {
        sequence = scanner.Text()
    }

    sequenceList := strings.Split(sequence, "")

    total := 0
    for index, value := range sequenceList {
        int_value, _ := strconv.Atoi(value)

        if len(sequenceList) > index + 1 {
            if sequenceList[index + 1] == value {
                total += int_value
            }
        } else {
            if sequenceList[0] == value {
                total += int_value
            }
        }
    }

    fmt.Println("Total: ", total)
}
