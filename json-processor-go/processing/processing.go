package processing

import (
	"encoding/json"
	"io/ioutil"
	"json-processor-go/api"
	"json-processor-go/utils"
	"path/filepath"
)

var directories = map[string]string{
	"contract":                "/app/crawlers/packages/contractDataJob/contractFiles",
	"councilor":               "/app/crawlers/packages/councilorDataJob/councilorFiles",
	"frequency":               "/app/crawlers/packages/frequencyDataJob/frequencyFiles",
	"generalProductivity":     "/app/crawlers/packages/generalProductivityDataJob/generalProductivityFiles",
	"proposition":             "/app/crawlers/packages/propositionDataJob/propositionFiles",
	"propositionProductivity": "/app/crawlers/packages/propositionProductivityDataJob/propositionProductivityFiles",
	"travelExpenses":          "/app/crawlers/packages/travelExpensesDataJob/travelExpensesFiles",
}

func ProcessJsonFiles() error {
	for key, dir := range directories {
		utils.Log.Infof("Processing files in directory: %s", dir)

		files, err := ioutil.ReadDir(dir)
		if err != nil {
			utils.Log.Warnf("Failed to read directory: %v", err)
			continue
		}

		for _, file := range files {
			if filepath.Ext(file.Name()) == ".json" {
				filePath := filepath.Join(dir, file.Name())
				data, err := ioutil.ReadFile(filePath)
				if err != nil {
					utils.Log.Warnf("Failed to read file %s: %v", file.Name(), err)
					continue
				}

				var jsonData []map[string]interface{}
				err = json.Unmarshal(data, &jsonData)
				if err != nil {
					utils.Log.Warnf("Failed to parse JSON from file %s: %v", file.Name(), err)
					continue
				}

				// Adicione a validação aqui
				err = validateFields(jsonData, []string{"requiredField"})
				if err != nil {
					utils.Log.Warnf("Validation failed for file %s: %v", file.Name(), err)
					continue
				}

				// Envie para a API
				err = api.SendToApi(jsonData, key)
				if err != nil {
					utils.Log.Errorf("Failed to send data for %s: %v", key, err)
				}
			}
		}
	}
	return nil
}
