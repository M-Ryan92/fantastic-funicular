import csv
import codecs


def csv_reader(file):
    return DictReaderInsensitive(codecs.iterdecode(file, "latin"))


class DictReaderInsensitive(csv.DictReader):
    # This class overrides the csv.fieldnames property.
    # All fieldnames are without white space and in lower case

    @property
    def fieldnames(self):
        return [
            field.strip().replace(" ", "_").lower()
            for field in csv.DictReader.fieldnames.fget(self)
        ]

    def next(self):
        return DictReaderInsensitive(csv.DictReader.next(self))
