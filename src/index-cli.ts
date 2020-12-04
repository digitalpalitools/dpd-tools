import yargs from 'yargs'
import * as GF from './cli/GenerateFiles'

const { argv } = yargs(process.argv.slice(2))
  .command({
    command: 'generate-files [ods-file] [sheet-name] [column-count]',
    describe: 'Generate DPD StarDict, vocab and root CSVs from DPD ODS.',
    builder: (ya) =>
      ya
        .default('ods-file', '/mnt/d/delme/dicts/Pali_English_Dictionary_10_rows.ods')
        .default('sheet-name', 'PALI-X')
        .default('column-count', 40),
    handler: (args) =>
      GF.runCommand({
        odsFile: args['ods-file'],
        sheetName: args['sheet-name'],
        columnCount: args['column-count'],
      } as GF.CommandArgs),
  })
  .demandCommand(1)
  .strict()
  .help()
  .wrap(120)

if (!argv._[0]) {
  yargs.showHelp()
}
